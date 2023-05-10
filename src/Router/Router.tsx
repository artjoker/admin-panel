import { Suspense } from 'react';
import {
  Outlet,
  Route,
  Routes as RouterRoutes,
  useLocation,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Home, Login, NotFound, Pages, UserForm, Users } from '@/pages';
import { Language } from '@/modules/Language';
import { Routes } from '@/constants/routes';
import { PrivateLayout, Spinner } from '@/ui';
import { languagePathRegex } from '@/constants/common';

import { PrivateRoute } from './PrivateRoute';
import { MultiLanguagesRoute } from './MultiLanguagesRoute';
import { BaseLanguageRoute } from './BaseLanguageRoute';

export const Router = () => {
  const {
    i18n: { language },
  } = useTranslation();

  const location = useLocation();

  return (
    <RouterRoutes>
      <Route path={Routes.BASE}>
        <Route
          path={Routes.BASE}
          element={
            <PrivateRoute
              redirectTo={
                language !== Language.EN
                  ? `/${language}${Routes.LOGIN}`
                  : Routes.LOGIN
              }
              isAuth={
                !!(
                  sessionStorage.getItem('token') ||
                  localStorage.getItem('token')
                )
              }
            >
              <PrivateLayout />
            </PrivateRoute>
          }
        >
          <Route
            path={Routes.HOME_LANGUAGE}
            element={
              <MultiLanguagesRoute
                language={language as Language}
                path={location.pathname}
                isValidLanguage={!!location.pathname.match(languagePathRegex)}
              >
                <Outlet />
              </MultiLanguagesRoute>
            }
          >
            <Route
              path={Routes.HOME_LANGUAGE}
              element={
                <Suspense fallback={<Spinner />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path={Routes.USERS_LANGUAGE}
              element={
                <Suspense fallback={<Spinner />}>
                  <Users />
                </Suspense>
              }
            />
            <Route
              path={Routes.USER_FORM_LANGUAGE}
              element={
                <Suspense fallback={<Spinner />}>
                  <UserForm />
                </Suspense>
              }
            />
            <Route
              path={Routes.USER_FORM_DATA_LANGUAGE}
              element={
                <Suspense fallback={<Spinner />}>
                  <UserForm />
                </Suspense>
              }
            />
            <Route
              path={Routes.PAGES_LANGUAGE}
              element={
                <Suspense fallback={<Spinner />}>
                  <Pages />
                </Suspense>
              }
            />
            <Route path={Routes.NOT_FOUND} element={<NotFound />} />
          </Route>
          <Route
            path={Routes.HOME}
            element={
              <BaseLanguageRoute>
                <Outlet />
              </BaseLanguageRoute>
            }
          >
            <Route
              path={Routes.HOME}
              element={
                <Suspense fallback={<Spinner />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path={Routes.USERS}
              element={
                <Suspense fallback={<Spinner />}>
                  <Users />
                </Suspense>
              }
            />
            <Route
              path={Routes.USER_FORM}
              element={
                <Suspense fallback={<Spinner />}>
                  <UserForm />
                </Suspense>
              }
            />
            <Route
              path={Routes.USER_FORM_DATA}
              element={
                <Suspense fallback={<Spinner />}>
                  <UserForm />
                </Suspense>
              }
            />
            <Route
              path={Routes.PAGES}
              element={
                <Suspense fallback={<Spinner />}>
                  <Pages />
                </Suspense>
              }
            />
            <Route path={Routes.NOT_FOUND} element={<NotFound />} />
          </Route>
        </Route>
        <Route
          path={Routes.LOGIN_LANGUAGE}
          element={
            <MultiLanguagesRoute
              language={language as Language}
              path={location.pathname}
              isValidLanguage={!!location.pathname.match(languagePathRegex)}
            >
              <Outlet />
            </MultiLanguagesRoute>
          }
        >
          <Route path={Routes.LOGIN_LANGUAGE} element={<Login />} />
        </Route>
        <Route
          path={Routes.LOGIN}
          element={
            <BaseLanguageRoute>
              <Outlet />
            </BaseLanguageRoute>
          }
        >
          <Route
            path={Routes.LOGIN}
            element={
              <Suspense fallback={<Spinner />}>
                <Login />
              </Suspense>
            }
          />
        </Route>
        <Route
          path={Routes.NOT_FOUND}
          element={
            <Suspense fallback={<Spinner />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </RouterRoutes>
  );
};
