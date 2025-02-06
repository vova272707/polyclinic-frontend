/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AcceptStudent {
  /** Accept */
  accept: boolean;
}

export interface Student {
  /** ID */
  pk?: number;
  /**
   * Full name
   * @minLength 1
   * @maxLength 100
   */
  full_name: string;
  /**
   * Group
   * @minLength 1
   * @maxLength 100
   */
  group: string;
  /** Status */
  status?: "draft" | "formed" | "completed" | "cancelled" | "deleted";
  /**
   * Created at
   * @format date-time
   */
  created_at?: string;
  /**
   * Formed at
   * @format date-time
   */
  formed_at?: string | null;
  /**
   * Ended at
   * @format date-time
   */
  ended_at?: string | null;
  /**
   * Username
   * @minLength 1
   * @maxLength 100
   */
  username?: string | null;
  /** Moderator */
  moderator?: number | null;
  /**
   * Sum cost
   * @min -2147483648
   * @max 2147483647
   */
  sum_cost?: number | null;
}

export interface AuthToken {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface UserUpdate {
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
}

export interface UserRegistration {
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface PutStudent {
  /**
   * Full name
   * @minLength 1
   */
  full_name: string;
  /**
   * Group
   * @minLength 1
   */
  group: string;
  /** Status */
  status?: "draft" | "formed" | "completed" | "cancelled" | "deleted";
  /**
   * Created at
   * @format date-time
   */
  created_at?: string;
  /**
   * Formed at
   * @format date-time
   */
  formed_at?: string | null;
  /**
   * Ended at
   * @format date-time
   */
  ended_at?: string | null;
  /**
   * Username
   * @minLength 1
   * @maxLength 100
   */
  username?: string | null;
  /** Moderator */
  moderator?: number | null;
  /**
   * Sum cost
   * @min -2147483648
   * @max 2147483647
   */
  sum_cost?: number | null;
}

export interface TimeTableList {
  /** ID */
  pk?: number;
  /**
   * Title
   * @minLength 1
   * @maxLength 100
   */
  title: string;
  /**
   * Description
   * @minLength 1
   */
  description: string;
  /** Status */
  status?: "active" | "deleted";
  /**
   * Picture url
   * @format uri
   * @minLength 1
   * @maxLength 200
   */
  picture_url: string;
}

export interface TimeTableDetail {
  /** ID */
  pk?: number;
  /**
   * Title
   * @minLength 1
   * @maxLength 100
   */
  title: string;
  /**
   * Description
   * @minLength 1
   */
  description: string;
  /** Status */
  status?: "active" | "deleted";
  /**
   * Picture url
   * @format uri
   * @minLength 1
   * @maxLength 200
   */
  picture_url: string;
}

export interface AddImage {
  /** Timetable id */
  timetable_id: number;
  /**
   * Picture url
   * @format uri
   * @minLength 1
   */
  picture_url: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD Lic
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  addCostToStudent = {
    /**
     * @description Редактирования стоимости в данное время для студента.
     *
     * @tags add-cost-to-student
     * @name AddCostToStudentTimetableUpdate
     * @request PUT:/add-cost-to-student/{student_pk}/timetable/{timetable_pk}
     * @secure
     */
    addCostToStudentTimetableUpdate: (
      studentPk: string,
      timetablePk: string,
      data: {
        /** Стоимость */
        cost: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/add-cost-to-student/${studentPk}/timetable/${timetablePk}`,
        method: "PUT",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Удалить время из заявки.
     *
     * @tags add-cost-to-student
     * @name AddCostToStudentTimetableDelete
     * @request DELETE:/add-cost-to-student/{student_pk}/timetable/{timetable_pk}
     * @secure
     */
    addCostToStudentTimetableDelete: (studentPk: string, timetablePk: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/add-cost-to-student/${studentPk}/timetable/${timetablePk}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  deleteFromStudent = {
    /**
     * @description Редактирования стоимости в данное время для студента.
     *
     * @tags delete-from-student
     * @name DeleteFromStudentTimetableUpdate
     * @request PUT:/delete-from-student/{student_pk}/timetable/{timetable_pk}
     * @secure
     */
    deleteFromStudentTimetableUpdate: (
      studentPk: string,
      timetablePk: string,
      data: {
        /** Стоимость */
        cost: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/delete-from-student/${studentPk}/timetable/${timetablePk}`,
        method: "PUT",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Удалить время из заявки.
     *
     * @tags delete-from-student
     * @name DeleteFromStudentTimetableDelete
     * @request DELETE:/delete-from-student/{student_pk}/timetable/{timetable_pk}
     * @secure
     */
    deleteFromStudentTimetableDelete: (studentPk: string, timetablePk: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/delete-from-student/${studentPk}/timetable/${timetablePk}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  deleteStudent = {
    /**
     * @description Подтвердить или отклонить заявку (for moderators).
     *
     * @tags delete-student
     * @name DeleteStudentUpdate
     * @request PUT:/delete-student/{id}/
     * @secure
     */
    deleteStudentUpdate: (id: string, data: AcceptStudent, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/delete-student/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Удалить заявку (for moderators).
     *
     * @tags delete-student
     * @name DeleteStudentDelete
     * @request DELETE:/delete-student/{id}/
     * @secure
     */
    deleteStudentDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/delete-student/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  formStudent = {
    /**
     * @description Отмечает заявку как сформированную. Доступно только для заявок-черновиков.
     *
     * @tags form-student
     * @name FormStudentUpdate
     * @request PUT:/form-student/{id}/
     * @secure
     */
    formStudentUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/form-student/${id}/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  listStudents = {
    /**
     * @description Получить список студентов. Фильтрация по статусу и дате.
     *
     * @tags list-students
     * @name ListStudentsList
     * @request GET:/list-students/
     * @secure
     */
    listStudentsList: (
      query?: {
        /**
         * Фильтр по дате
         * @format date
         */
        date?: string;
        /** Фильтр по статусу */
        status?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Student[], any>({
        path: `/list-students/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  login = {
    /**
     * @description Аунтификация пользователя с логином и паролем. Возвращает файл cookie сеанса в случае успеха.
     *
     * @tags login
     * @name LoginCreate
     * @request POST:/login/
     * @secure
     */
    loginCreate: (data: AuthToken, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  logout = {
    /**
     * @description Выход аунтифицированного пользователя. Удаление сессии.
     *
     * @tags logout
     * @name LogoutCreate
     * @request POST:/logout/
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  moderateStudent = {
    /**
     * @description Подтвердить или отклонить заявку (for moderators).
     *
     * @tags moderate-student
     * @name ModerateStudentUpdate
     * @request PUT:/moderate-student/{id}/
     * @secure
     */
    moderateStudentUpdate: (id: string, data: AcceptStudent, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/moderate-student/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Удалить заявку (for moderators).
     *
     * @tags moderate-student
     * @name ModerateStudentDelete
     * @request DELETE:/moderate-student/{id}/
     * @secure
     */
    moderateStudentDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/moderate-student/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  profile = {
    /**
     * @description Обновление профиля аунтифицированного пользователя
     *
     * @tags profile
     * @name ProfileUpdate
     * @request PUT:/profile/
     * @secure
     */
    profileUpdate: (data: UserUpdate, params: RequestParams = {}) =>
      this.request<UserUpdate, void>({
        path: `/profile/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  register = {
    /**
     * @description Регистрация нового пользователя.
     *
     * @tags register
     * @name RegisterCreate
     * @request POST:/register/
     * @secure
     */
    registerCreate: (data: UserRegistration, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  student = {
    /**
     * @description Получить студента по ID, включая соответствующие промежутки времени.
     *
     * @tags student
     * @name StudentRead
     * @request GET:/student/{id}/
     * @secure
     */
    studentRead: (id: string, params: RequestParams = {}) =>
      this.request<Student, any>({
        path: `/student/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Редактировать студента по ID.
     *
     * @tags student
     * @name StudentUpdate
     * @request PUT:/student/{id}/
     * @secure
     */
    studentUpdate: (id: string, data: PutStudent, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/student/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  timetables = {
    /**
     * @description Получение расписания. Можно отфильтровать по времени.
     *
     * @tags timetables
     * @name TimetablesList
     * @request GET:/timetables/
     * @secure
     */
    timetablesList: (
      query?: {
        /**
         * Промежуток времени
         * @default ""
         */
        title?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<TimeTableList[], any>({
        path: `/timetables/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавление время в заявку-черновик пользователя. Создается новая заявка, если не существует заявки-черновика
     *
     * @tags timetables
     * @name TimetablesAddCreate
     * @request POST:/timetables/add/{timetable_id}/
     * @secure
     */
    timetablesAddCreate: (
      timetableId: string,
      data: {
        /**
         * Стоимость в данное время
         * @example 10000
         */
        cost?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/timetables/add/${timetableId}/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Получить информацию о конкретном промежутке времени по ID.
     *
     * @tags timetables
     * @name TimetablesCreateList
     * @request GET:/timetables/create/
     * @secure
     */
    timetablesCreateList: (params: RequestParams = {}) =>
      this.request<TimeTableDetail, any>({
        path: `/timetables/create/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавление нового время (moderators only).
     *
     * @tags timetables
     * @name TimetablesCreateCreate
     * @request POST:/timetables/create/
     * @secure
     */
    timetablesCreateCreate: (data: TimeTableDetail, params: RequestParams = {}) =>
      this.request<TimeTableDetail, void>({
        path: `/timetables/create/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновление данных МО (moderators only).
     *
     * @tags timetables
     * @name TimetablesCreateUpdate
     * @request PUT:/timetables/create/
     * @secure
     */
    timetablesCreateUpdate: (data: TimeTableDetail, params: RequestParams = {}) =>
      this.request<TimeTableDetail, void>({
        path: `/timetables/create/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаление промежутка времени по ID (moderators only).
     *
     * @tags timetables
     * @name TimetablesCreateDelete
     * @request DELETE:/timetables/create/
     * @secure
     */
    timetablesCreateDelete: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/timetables/create/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Получить информацию о конкретном промежутке времени по ID.
     *
     * @tags timetables
     * @name TimetablesDeleteRead
     * @request GET:/timetables/delete/{id}/
     * @secure
     */
    timetablesDeleteRead: (id: string, params: RequestParams = {}) =>
      this.request<TimeTableDetail, any>({
        path: `/timetables/delete/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавление нового время (moderators only).
     *
     * @tags timetables
     * @name TimetablesDeleteCreate
     * @request POST:/timetables/delete/{id}/
     * @secure
     */
    timetablesDeleteCreate: (id: string, data: TimeTableDetail, params: RequestParams = {}) =>
      this.request<TimeTableDetail, void>({
        path: `/timetables/delete/${id}/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновление данных МО (moderators only).
     *
     * @tags timetables
     * @name TimetablesDeleteUpdate
     * @request PUT:/timetables/delete/{id}/
     * @secure
     */
    timetablesDeleteUpdate: (id: string, data: TimeTableDetail, params: RequestParams = {}) =>
      this.request<TimeTableDetail, void>({
        path: `/timetables/delete/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаление промежутка времени по ID (moderators only).
     *
     * @tags timetables
     * @name TimetablesDeleteDelete
     * @request DELETE:/timetables/delete/{id}/
     * @secure
     */
    timetablesDeleteDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/timetables/delete/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Загрузить изображение для времени
     *
     * @tags timetables
     * @name TimetablesImageCreate
     * @request POST:/timetables/image/
     * @secure
     */
    timetablesImageCreate: (data: AddImage, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/timetables/image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Получить информацию о конкретном промежутке времени по ID.
     *
     * @tags timetables
     * @name TimetablesUpdateRead
     * @request GET:/timetables/update/{id}/
     * @secure
     */
    timetablesUpdateRead: (id: string, params: RequestParams = {}) =>
      this.request<TimeTableDetail, any>({
        path: `/timetables/update/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавление нового время (moderators only).
     *
     * @tags timetables
     * @name TimetablesUpdateCreate
     * @request POST:/timetables/update/{id}/
     * @secure
     */
    timetablesUpdateCreate: (id: string, data: TimeTableDetail, params: RequestParams = {}) =>
      this.request<TimeTableDetail, void>({
        path: `/timetables/update/${id}/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновление данных МО (moderators only).
     *
     * @tags timetables
     * @name TimetablesUpdateUpdate
     * @request PUT:/timetables/update/{id}/
     * @secure
     */
    timetablesUpdateUpdate: (id: string, data: TimeTableDetail, params: RequestParams = {}) =>
      this.request<TimeTableDetail, void>({
        path: `/timetables/update/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаление промежутка времени по ID (moderators only).
     *
     * @tags timetables
     * @name TimetablesUpdateDelete
     * @request DELETE:/timetables/update/{id}/
     * @secure
     */
    timetablesUpdateDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/timetables/update/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Получить информацию о конкретном промежутке времени по ID.
     *
     * @tags timetables
     * @name TimetablesRead
     * @request GET:/timetables/{id}/
     * @secure
     */
    timetablesRead: (id: string, params: RequestParams = {}) =>
      this.request<TimeTableDetail, any>({
        path: `/timetables/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавление нового время (moderators only).
     *
     * @tags timetables
     * @name TimetablesCreate
     * @request POST:/timetables/{id}/
     * @secure
     */
    timetablesCreate: (id: string, data: TimeTableDetail, params: RequestParams = {}) =>
      this.request<TimeTableDetail, void>({
        path: `/timetables/${id}/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновление данных МО (moderators only).
     *
     * @tags timetables
     * @name TimetablesUpdate
     * @request PUT:/timetables/{id}/
     * @secure
     */
    timetablesUpdate: (id: string, data: TimeTableDetail, params: RequestParams = {}) =>
      this.request<TimeTableDetail, void>({
        path: `/timetables/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаление промежутка времени по ID (moderators only).
     *
     * @tags timetables
     * @name TimetablesDelete
     * @request DELETE:/timetables/{id}/
     * @secure
     */
    timetablesDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/timetables/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
