import { ExpenseType, IncomeStatementExpense } from "../IncomeStatement";
import { IncomeStatement } from "../IncomeStatement";
import { IncomeStatementService } from "./income-statement.service";

describe('IncomeStatementService', () => {
  
  let service: IncomeStatementService;
  let incomeStatement: IncomeStatement;

  beforeEach(() => {
    //We create it new for every test
    service = new IncomeStatementService();
    incomeStatement = new IncomeStatement();
    //all test have these values
    incomeStatement.revenue = 10;
    incomeStatement.costOfGoodsSold = 6;
  });    

  describe('incomeStatementFactory', () => {
    it('ebay example', () => {
      
      //arrange
      const expenseList: IncomeStatementExpense[] = [
        { name: "ebay % fee", modifier: 13.25, expenseType: ExpenseType.percentOfRevenue },
        { name: "per order fee", modifier: .30, expenseType: ExpenseType.fixedFee }
      ];
      //act
      const incomeStatement = service.incomeStatementFactory(19.97, 11, expenseList,35);
      //assert
      expect(incomeStatement.expenseList[0].value).toBe(2.65);
    });
    
  });

  describe('setExpenseTotal',()=>{
    it('no expenses should return 0', () => {
      service.setExpenseTotal(incomeStatement);
      expect(incomeStatement.expense).toBe(0);
    });        

    it('3% fee of revenue', () => {
      incomeStatement.expenseList.push({ name: '3% of Revenue', modifier: 3, expenseType: ExpenseType.percentOfRevenue });
      service.setExpenseTotal(incomeStatement);
      expect(incomeStatement.expense).toBe(.30);
    });
  
    it('3% fee of revenue ebay fee', () => {
      incomeStatement.expenseList.push({ name: 'Ebay', modifier: 1.25, expenseType: ExpenseType.fixedFee });
      service.setExpenseTotal(incomeStatement);
      expect(incomeStatement.expense).toBe(1.25);
    });

    it('3% fee of revenue ebay fee', () => {
      incomeStatement.expenseList.push(
        { name: 'Ebay', modifier: 1, expenseType: ExpenseType.fixedFee },
        { name: 'Ebay', modifier: 3, expenseType: ExpenseType.percentOfRevenue }
      );
      expect(incomeStatement.revenue).toBe(10);
      expect(incomeStatement.costOfGoodsSold).toBe(6);
      service.setExpenseTotal(incomeStatement);
      //we expect the 1.00 fee + 3% of 10 (revenue)
      // 1 + .30 = 1.30
      expect(incomeStatement.expense).toBe(1.30);
    }); 

  })

  //calculateIncomeStatmentProperties are in their own file  

  describe('grossProfitBeforeExpenses', () => {
    it('50', () => {
      const gp = service.grossProfitBeforeExpenses(100, 50);
      expect(gp).toBe(50)
    });

    it('50.50', () => {
      const gp = service.grossProfitBeforeExpenses(100.50, 50);
      expect(gp).toBe(50.50)
    });
  });

  describe('taxes', () => {
    it('35', () => {
      const tax = service.taxes(100, 35)
      expect(tax).toBe(35)
    });

    it('70', () => {
      const tax = service.taxes(200, 35)
      expect(tax).toBe(70)
    });

    it('70', () => {
      const tax = service.taxes(197, 24.5)
      expect(tax).toBe(48.27)
    });
  });

  describe('netIncome', () => {
    it('35', () => {
      const netIncome = service.netIncome(100, 35)
      expect(netIncome).toBe(65)
    });

    it('60', () => {
      const netIncome = service.netIncome(100.50, 40.50)
      expect(netIncome).toBe(60)
    });
  });

});