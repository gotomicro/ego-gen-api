import { request } from "umi";
import { 
  GoodsCreateReq,
  SelfRefType,
  Params,
  Property,
  GoodsInfoRes
 } from "./types";

/*
 * @description 创建商品接口
 */
export function shopGoodsCreate(data: GoodsCreateReq) {
  return request<{ raw?: any; guid?: string; selfRef?: SelfRefType; Status?: Params; stringAlias?: string; }>(`/api/goods`, {
    method: "post",
    data,
  });
}

/*
 * @description 删除商品
 */
export function shopGoodsDelete(guid: string, query: { formDataField?: string }) {
  return request(`/api/goods/${guid}`, {
    method: "delete",
    params: query,
  });
}

/*
 * @description 下架商品
 */
export function shopGoodsDown(guid: string, data: {
  operatorUid?: string;
  dateRange?: string[];
}) {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return request<{ Status?: string; }>(`/api/goods/${guid}/down`, {
    method: "post",
    data: formData,
  });
}

/*
 * @description 商品详情
 */
export function shopGoodsInfo(guid: string) {
  return request<{ title?: string; subTitle?: string; cover?: string; price?: number; properties?: Record<string, Property>; mapInt?: Record<number, Property>; }>(`/api/v2/goods/${guid}`, {
    method: "get",
  });
}

export function shopWrappedHandler(query: { hello?: string; world?: string }) {
  return request<{ code: number; msg: string; data: GoodsInfoRes; }>(`/wrapped-handler`, {
    method: "get",
    params: query,
  });
}