import { IncomeStatementState } from "../../income-statement-store";
import { ExpenseType, IncomeStatement } from "../../IncomeStatement";

export const EbayTShirt_MOCK = new IncomeStatement();
EbayTShirt_MOCK.name = 'Ebay (customer pays shipping)'
EbayTShirt_MOCK.revenue = 14.95;
EbayTShirt_MOCK.costOfGoodsSold = 11.42;
EbayTShirt_MOCK.taxRate = 35;
EbayTShirt_MOCK.expenseList.push({ name: 'Ebay % Fee', modifier: 13.25, expenseType: ExpenseType.percentOfRevenue });
EbayTShirt_MOCK.expenseList.push({ name: 'Per Order Fee', modifier: .30, expenseType: ExpenseType.fixedFee });

export const EtsyTShirt_MOCK = new IncomeStatement();
EtsyTShirt_MOCK.name = "Etsy (customer pays shipping)"
EtsyTShirt_MOCK.revenue = 14.95;
EtsyTShirt_MOCK.costOfGoodsSold = 11.42;
EtsyTShirt_MOCK.taxRate = 35;
EtsyTShirt_MOCK.expenseList.push({ name: "Etsy % Fee", modifier: 6.5, expenseType: ExpenseType.percentOfRevenue });
EtsyTShirt_MOCK.expenseList.push({ name: "Per Order Fee", modifier: .20, expenseType: ExpenseType.fixedFee });                        

export const bigCurtTackleMock = new IncomeStatement();
bigCurtTackleMock.name = "Big Curt Tackle"
bigCurtTackleMock.revenue = 18.95;
bigCurtTackleMock.costOfGoodsSold = 11.42;
bigCurtTackleMock.taxRate = 35;
bigCurtTackleMock.expenseList.push({ name: "Free Shipping Cost", modifier: 4.75, expenseType:ExpenseType.fixedFee });
export const incomeStatementStateMock: IncomeStatementState = {
    revenue: 14.95,
    costOfGoodsSold: 11.42,
    taxRatePercent: 35,
    incomeStatementList: [bigCurtTackleMock, EbayTShirt_MOCK,EtsyTShirt_MOCK]
}