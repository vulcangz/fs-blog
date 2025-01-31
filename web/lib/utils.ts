import { MediaData, Response } from '@/interfaces';
import { axiosInstance } from '@/lib/fetcher';

export const uploadFiles = async (files: File[]) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append('file', file);
  }

  return await axiosInstance.post<Response<MediaData>>(
    `${process.env.NEXT_PUBLIC_API_BASE}/file/`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return await axiosInstance.post<Response<MediaData>>(
    `${process.env.NEXT_PUBLIC_API_BASE}/file/upload`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
};

export const deleteFiles = async (ids: number[]) => {
  return await axiosInstance.delete(
    `${process.env.NEXT_PUBLIC_API_BASE}/file/delete/?filter={"id":{"$in",ids}}`
  );
};

export const pluck = (arr, keys) => arr.map((i) => keys.map((k) => i[k]));

export function removeBlankAttributes(obj) {
  const result = {};
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }
  return result;
}

export function uniqueFunc(arr, uniId) {
  const res = new Map();
  return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
}

export function formatDate(date, needYear?) {
  return needYear
    ? new Date(date).toLocaleString('default', {
        year: '2-digit',
        month: 'long',
        day: '2-digit'
      })
    : new Date(date).toLocaleString('default', {
        month: 'long',
        day: '2-digit'
      });
}

export class ValidationUtils {
  static emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}
