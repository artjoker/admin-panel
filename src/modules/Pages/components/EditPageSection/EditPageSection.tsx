import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { DatePicker, Input, RichTextEditor, Select } from '@/ui';
import {
  FormItem,
  LanguageSelect,
  showSuccessToast,
  useForm,
  useWatchForm,
} from '@/components';
import {
  Language,
  mapLanguageToShortName,
  emptyMultiLangValue,
  MultiLang,
  languageOptions,
} from '@/modules/Language';
import { IPage } from '@/models/page.model';

import { useUpdatePage } from '../../features';
import {
  ICreatePageFormValues,
  IEditPageFormValues,
  PageFieldName,
} from '../../types';
import { useFormValidationRules } from '../../helpers/form';
import {
  StyledEditPageSection,
  StyledForm,
  StyledFormContent,
  StyledFormItemList,
  StyledDivider,
  StyledButtonContainer,
  StyledButton,
} from './EditPageSectionStyles';
import ImagesFormBlock from '../ImagesFormBlock/ImagesFormBlock';
import { UpdatePageDTO } from '../../dtos';
import { useGetPageTypeOptions } from '../../hooks';

interface IEditPageSectionProps {
  page: IPage | null;
  onClose: () => void;
}

const EditPageSection = ({ page, onClose }: IEditPageSectionProps) => {
  const { t } = useTranslation();

  const { updatePage } = useUpdatePage();
  const pageTypeOptions = useGetPageTypeOptions();

  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    Language.EN,
  );

  const languageList = Object.values(Language);

  const validationRules = useFormValidationRules();

  const initialValues = useMemo(
    () => ({
      [PageFieldName.TITLE]: page?.title
        ? { ...emptyMultiLangValue, ...page?.title }
        : emptyMultiLangValue,
      [PageFieldName.URL_SLUG]: page?.urlSlug ?? '',
      [PageFieldName.PUBLISHED_AT]: page?.publishedAt
        ? dayjs(page?.publishedAt)
        : null,
      [PageFieldName.CONTENT]: page?.content
        ? { ...emptyMultiLangValue, ...page?.content }
        : emptyMultiLangValue,
      [PageFieldName.IS_ACTIVE]: page?.isActive ?? false,
      [PageFieldName.PAGE_TYPE]: page?.pageType,
      [PageFieldName.IMAGES]: page?.images.map((image) => image.id),
    }),
    [
      page?.content,
      page?.images,
      page?.isActive,
      page?.pageType,
      page?.publishedAt,
      page?.title,
      page?.urlSlug,
    ],
  );

  const [form] = useForm();

  const title: MultiLang =
    useWatchForm('title', form) || initialValues[PageFieldName.TITLE];

  const handleSubmit = (values: IEditPageFormValues) => {
    if (!page) {
      return;
    }

    const updatePageDTO = new UpdatePageDTO(page.id, values);

    updatePage(updatePageDTO, {
      onSuccess: () => {
        showSuccessToast({
          message: t('pageUpdatedSuccessfully'),
        });
      },
    });
  };

  useEffect(() => {
    if (page) {
      form.resetFields();
    }
  }, [form, page]);

  const handleValuesChange = (
    changedValues: Partial<ICreatePageFormValues>,
  ) => {
    if (changedValues.urlSlug) {
      form.setFieldValue(
        PageFieldName.URL_SLUG,
        changedValues.urlSlug.toLowerCase(),
      );
    }
  };

  return (
    <StyledEditPageSection>
      <StyledForm
        form={form}
        onFinish={handleSubmit}
        initialValues={initialValues}
        onValuesChange={handleValuesChange}
      >
        <StyledFormContent>
          <FormItem>
            <LanguageSelect
              language={selectedLanguage}
              languageOptions={languageOptions}
              onChange={setSelectedLanguage}
            />
          </FormItem>
          <StyledDivider />
          <FormItem name={PageFieldName.PAGE_TYPE}>
            <Select
              label={t('pageType') as string}
              placeholder={t('pageType')}
              options={pageTypeOptions}
            />
          </FormItem>
          <StyledFormItemList>
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
            <FormItem name={PageFieldName.PUBLISHED_AT}>
              <DatePicker
                label={t('publicationDate')}
                placeholder={t('enterPublicationDate') as string}
                picker="date"
              />
            </FormItem>
            {languageList.map((lang) => {
              const shortLang = mapLanguageToShortName[lang];

              return (
                <FormItem
                  key={lang}
                  hidden={lang !== selectedLanguage}
                  name={[PageFieldName.CONTENT, lang]}
                  dependencies={languageList.map((lang) => [
                    PageFieldName.CONTENT,
                    lang,
                  ])}
                >
                  <RichTextEditor
                    label={`${t('content')} (${shortLang})`}
                    modules={{
                      toolbar: {
                        container: [
                          [{ header: [1, 2, 3, 4, 5, 6, false] }],
                          ['bold', 'italic', 'underline'],
                          [{ list: 'ordered' }, { list: 'bullet' }],
                          [{ align: [] }],
                          ['link', 'image'],
                          ['clean'],
                          [{ color: [] }],
                        ],
                      },
                    }}
                  />
                </FormItem>
              );
            })}
          </StyledFormItemList>
          <div>
            <h3>{t('images')}</h3>
            <FormItem name={PageFieldName.IMAGES}>
              <ImagesFormBlock
                id={page?.id}
                defaultFileList={page?.images.map((image) => ({
                  uid: image.id,
                  name: image.id,
                  status: 'done',
                  url: image.url,
                }))}
              />
            </FormItem>
          </div>
        </StyledFormContent>
        <StyledButtonContainer>
          <StyledButton type="primary" htmlType="submit">
            {t('save')}
          </StyledButton>
          <StyledButton onClick={onClose} type="default">
            {t('close')}
          </StyledButton>
        </StyledButtonContainer>
      </StyledForm>
    </StyledEditPageSection>
  );
};

export default EditPageSection;
