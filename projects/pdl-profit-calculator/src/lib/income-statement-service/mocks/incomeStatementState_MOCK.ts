import { IncomeStatementState } from "../../income-statement-store";
import { ExpenseType, IncomeStatement } from "../../IncomeStatement";

const costOfGoodsSold = 11.42;
const revenue = 14.95;
export const IncomeStatement_Ebay_MOCK = new IncomeStatement();

IncomeStatement_Ebay_MOCK.name = 'Ebay (customer pays shipping)';
IncomeStatement_Ebay_MOCK.revenue = revenue;
IncomeStatement_Ebay_MOCK.costOfGoodsSold = costOfGoodsSold;
IncomeStatement_Ebay_MOCK.taxRate = 35;
IncomeStatement_Ebay_MOCK.expenseList.push({ name: 'Ebay % Fee', modifier: 13.25, expenseType: ExpenseType.percentOfRevenue });
IncomeStatement_Ebay_MOCK.expenseList.push({ name: 'Per Order Fee', modifier: .30, expenseType: ExpenseType.fixedFee });

export const IncomeStatement_Etsy_MOCK = new IncomeStatement();
IncomeStatement_Etsy_MOCK.name = "Etsy (customer pays shipping)";
IncomeStatement_Etsy_MOCK.revenue = revenue;
IncomeStatement_Etsy_MOCK.costOfGoodsSold = costOfGoodsSold;
IncomeStatement_Etsy_MOCK.taxRate = 35;
IncomeStatement_Etsy_MOCK.expenseList.push({ name: "Etsy % Fee", modifier: 6.5, expenseType: ExpenseType.percentOfRevenue });
IncomeStatement_Etsy_MOCK.expenseList.push({ name: "Per Order Fee", modifier: .20, expenseType: ExpenseType.fixedFee });

export const IncomeStatement_BigCurtTackle_Mock = new IncomeStatement();
IncomeStatement_BigCurtTackle_Mock.name = "Big Curt Tackle";
IncomeStatement_BigCurtTackle_Mock.revenue = revenue;
IncomeStatement_BigCurtTackle_Mock.costOfGoodsSold = costOfGoodsSold;
IncomeStatement_BigCurtTackle_Mock.taxRate = 35;
IncomeStatement_BigCurtTackle_Mock.expenseList.push({ name: "Free Shipping Cost", modifier: 4.75, expenseType:ExpenseType.fixedFee });
export const incomeStatementStateMock: IncomeStatementState = {
    revenue: 14.95,
    costOfGoodsSold: 11.42,
    taxRatePercent: 35,
    incomeStatementList: [IncomeStatement_BigCurtTackle_Mock, IncomeStatement_Ebay_MOCK,IncomeStatement_Etsy_MOCK]
};