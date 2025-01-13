import { ParamMap } from "@angular/router";

export const isSafetyPriority_QueryString = 'isSafetyPriority';
export const isInvite_QueryString = 'isInvite';
export const messageId_QueryString = 'messageId';
export const getFieldsFromParamMap = function (paramMap: ParamMap): {
  isSafeyPriority: boolean;
  isInvite: boolean;
  messageId: number;
} {

  const isSafeyPriority = parseInt(paramMap.get(isSafetyPriority_QueryString) as string) === 1;
  const isInvite = parseInt(paramMap.get(isInvite_QueryString) as string) === 1;

  //default to message 1
  let messageId = parseInt(paramMap.get(messageId_QueryString) as string);
  if (!messageId) {
    messageId = 0;
  }

  return {
    isSafeyPriority,
    isInvite,
    messageId
  };
};