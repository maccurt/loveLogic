import { convertToParamMap } from "@angular/router";
import { getFieldsFromParamMap } from "./getFieldsFromParamMap.function";
import { getInviteMessage } from "./invite.component";

describe('get invite message', () => {
    it('get message that does exist', () => {
        const message = getInviteMessage([{id:1,text:'does not matter'}],1);
        expect(message.id).toBe(1);
    });
    it('get message that does NOT exist', () => {
        const message = getInviteMessage([{id:1,text:'does not matter'}],2);
        expect(message.id).toBe(1);
    });

    it('get message that does exist with id 2', () => {
        const message = getInviteMessage([{id:2,text:'does not matter'}],2);
        expect(message.id).toBe(2);
    });
});

describe('query parm', () => {
    it('check all parms passing in', () => {
        const params = {
            isInvite: '1',
            isSafetyPriority: '1',
            messageId: '2'
        };
        
        const paramMap = convertToParamMap(params);
        const result = getFieldsFromParamMap(paramMap);
        expect(result.isInvite).toBe(true);
        expect(result.isSafeyPriority).toBe(true);
        expect(result.messageId).toBe(2);
    });

    it('check all parms NOT passed in', () => {
        const params = {};
        const paramMap = convertToParamMap(params);
        const result = getFieldsFromParamMap(paramMap);
        expect(result.isInvite).toBe(false);
        expect(result.isSafeyPriority).toBe(false);
        //It should default to 1
        expect(result.messageId).toBe(1);
    });
});