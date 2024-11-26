import { Business } from "./Business";
import { BusinessService } from "./business.service";

describe('', () => {

    it('', () => {
        const service = new BusinessService({} as any);
        const businessList: Business[] = [];
        const result = service.getCategoryListWithCount(businessList);
        expect(result.length > 0).toBe(true);
    });
});