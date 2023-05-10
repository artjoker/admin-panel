import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  FormItem,
  LanguageSelect,
  Modal,
  showErrorToast,
  showSuccessToast,
  useForm,
  useWatchForm,
} from '@/components';
import { IPage } from '@/models/page.model';
import {
  Language,
  mapLanguageToShortName,
  emptyMultiLangValue,
  MultiLang,
  languageOptions,
  anyLangValue,
} from '@/modules/Language';
import { Input } from '@/ui';
import { generateSlug } from '@/utils';

import { useCreatePage } from '../../features';
import { PageFieldName, ICreatePageFormValues } from '../../types';
import { useFormValidationRules } from '../../helpers/form';
import { StyledModalForm, StyledDivider } from './CreatePageModalStyles';
import { CreatePageDTO } from '../../dtos';

interface ICreatePageModalProps {
  pages: Array<IPage>;
  parentPage: IPage | null;
  isOpen: boolean;
  onClose: () => void;
}

const CreatePageModal = ({
  pages,
  parentPage,
  isOpen,
  onClose,
}: ICreatePageModalProps) => {
  const { t } = useTranslation();

  const [form] = useForm();

  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    Language.EN,
  );

  const languageList = Object.values(Language);

  const validationRules = useFormValidationRules();

  const { createPage } = useCreatePage();

  const [initialValues, setInitialValues] = useState<ICreatePageFormValues>({
    title: emptyMultiLangValue,
    urlSlug: '',
    isActive: false,
  });

  const title: MultiLang =
    useWatchForm('title', form) || initialValues[PageFieldName.TITLE];

  const handleOk = () => {
    if (!form.getFieldsError().some((field) => field.errors.length > 0)) {
      form.submit();
    }
  };

  const handleSubmit = (values: ICreatePageFormValues) => {
    const nodesAtSameLevel = pages.filter(
      (page) => page.parent?.id === parentPage?.id,
    );

    const sort = nodesAtSameLevel.length
      ? Math.max(...nodesAtSameLevel.map((node) => node.sort)) + 1
      : 1;

    const createPageDTO = new CreatePageDTO({
      ...values,
      parentId: parentPage?.id,
      isActive: false,
      sort,
    });

    createPage(createPageDTO, {
      onSuccess: () => {
        onClose();
        showSuccessToast({
          message: t('pageCreatedSuccessfully'),
        });
      },
      onError: () => {
        showErrorToast({
          message: 'Something went wrong',
        });
      },
    });
  };

  const handleValuesChange = (
    changedValues: Partial<ICreatePageFormValues>,
    values: ICreatePageFormValues,
  ) => {
    if (changedValues.title) {
      const urlSlug = generateSlug(anyLangValue(values.title)).toLowerCase();
      form.setFieldValue(PageFieldName.URL_SLUG, urlSlug);
      form.validateFields([PageFieldName.URL_SLUG]);
    }
    if (changedValues.urlSlug) {
      form.setFieldValue(
        PageFieldName.URL_SLUG,
        changedValues.urlSlug.toLowerCase(),
      );
    }
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedLanguage(Language.EN);

      setInitialValues({
        title: emptyMultiLangValue,
        urlSlug: '',
        isActive: false,
      });

      form.resetFields();
    }
  }, [form, isOpen]);

  return (
    <Modal
      open={isOpen}
      onOk={handleOk}
      onCancel={onClose}
      title={t('createPage')}
      okText={t('create')}
      cancelText={t('cancel')}
    >
      <StyledModalForm
        form={form}
        initialValues={initialValues}
        onFinish={handleSubmit}
        onValuesChange={handleValuesChange}
      >
        <FormItem>
          <LanguageSelect
            language={selectedLanguage}
            onChange={setSelectedLanguage}
            languageOptions={languageOptions}
          />
        </FormItem>
        <StyledDivider />
        {languageList.map((lang) => {
          const shortLang = mapLanguageToShortName[lang];

          return (
            <FormItem
              key={lang}
              hidden={lang !== selectedLanguage}
              name={[PageFieldName.TITLE, lang]}
              rules={validationRules[PageFieldName.TITLE]}
              dependencies={languageList.map((lang) => [
                PageFieldName.TITLE,
                lang,
              ])}
            >
              <Input
                label={`${t('title')} (${shortLang})`}
                placeholder={t('enterTitle') as string}
                withRequiredMark={
                  !Object.keys(title)
                    .filter((key) => key !== lang)
                    .map((key) => title[key as Language])
                    .some((value) => value.trim())
                }
              />
            </FormItem>
          );
        })}
        <FormItem
          name={PageFieldName.URL_SLUG}
          rules={validationRules[PageFieldName.URL_SLUG]}
        >
          <Input
            label="URL Slug"
            placeholder={t('enterUrlSlug') as string}
            withRequiredMark
          />
        </FormItem>
      </StyledModalForm>
    </Modal>
  );
};

export default CreatePageModal;
