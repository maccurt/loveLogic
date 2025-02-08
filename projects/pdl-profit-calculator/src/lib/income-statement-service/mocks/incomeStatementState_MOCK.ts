import { IncomeStatementState } from "../../income-statement-store";
import { ExpenseType, IncomeStatement } from "../../IncomeStatement";

const costOfGoodsSold = 11.42;
const revenue = 15.99;
export const IncomeStatement_Ebay_MOCK = new IncomeStatement();

IncomeStatement_Ebay_MOCK.name = 'Ebay';
IncomeStatement_Ebay_MOCK.url = 'https://www.ebay.com/itm/365378572922'
IncomeStatement_Ebay_MOCK.revenue = revenue;
IncomeStatement_Ebay_MOCK.costOfGoodsSold = costOfGoodsSold;
IncomeStatement_Ebay_MOCK.taxRate = 35;
IncomeStatement_Ebay_MOCK.expenseList.push({ name: 'Ebay % Fee', modifier: 13.25, expenseType: ExpenseType.percentOfRevenue });
IncomeStatement_Ebay_MOCK.expenseList.push({ name: 'Per Order Fee', modifier: .30, expenseType: ExpenseType.fixedFee });

export const IncomeStatement_Etsy_MOCK = new IncomeStatement();

IncomeStatement_Etsy_MOCK.show = false;
IncomeStatement_Etsy_MOCK.name = "Etsy";
IncomeStatement_Etsy_MOCK.revenue = revenue;
IncomeStatement_Etsy_MOCK.costOfGoodsSold = costOfGoodsSold;
IncomeStatement_Etsy_MOCK.taxRate = 35;
IncomeStatement_Etsy_MOCK.expenseList.push({ name: "Etsy % Fee", modifier: 6.5, expenseType: ExpenseType.percentOfRevenue });
IncomeStatement_Etsy_MOCK.expenseList.push({ name: "Per Order Fee", modifier: .20, expenseType: ExpenseType.fixedFee });

export const IncomeStatement_BigCurtTackle_Mock = new IncomeStatement();
IncomeStatement_BigCurtTackle_Mock.url = 'https://bigcurttackle.com/products/unisex-jersey-short-sleeve-tee'
IncomeStatement_BigCurtTackle_Mock.name = "BigCurtTackle.com";
IncomeStatement_BigCurtTackle_Mock.revenue = revenue;
IncomeStatement_BigCurtTackle_Mock.costOfGoodsSold = costOfGoodsSold;
IncomeStatement_BigCurtTackle_Mock.taxRate = 35;
// IncomeStatement_BigCurtTackle_Mock.expenseList.push({ name: "Free Shipping Cost", modifier: 4.75, expenseType: ExpenseType.fixedFee });
export const incomeStatementStateMock: IncomeStatementState = {
    revenue: 15.99,
    costOfGoodsSold: 11.42,
    taxRatePercent: 35,
    incomeStatementList: [IncomeStatement_BigCurtTackle_Mock, IncomeStatement_Ebay_MOCK, IncomeStatement_Etsy_MOCK],
    imageUrl: 'https://bigcurttackle.com/cdn/shop/files/9007929320327063954_2048_1024x1024@2x.jpg?v=1688657609',
    name: 'Common Carp Naturalized Not Invasive',
    description:"Celebrate and promote carp fishing with this naturalized and non-invasive design. Made with 100% Airlume combed and ring-spun cotton, this lightweight T-Shirt is perfect for active and leisure wear. The retail fit and crew neckline make it suitable for casual and semi-formal settings. Ideal for those who love carp fishing and want to spread awareness about the species. Perfect for wearing on fishing trips, outdoor activities, or as a casual everyday outfit."

};