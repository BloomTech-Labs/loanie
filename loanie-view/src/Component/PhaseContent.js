import React, { Component } from 'react';

export default class PhaseContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhase: 'Phase 2',
    };
  }
  render() {
    if (this.state.currentPhase === 'Phase 1') {
      return (
        <div>
          <p>
          In finance, a loan is the lending of money from one individual, organization or
          entity to another individual, organization or entity. A loan is a debt provided
          by an organization or individual to another entity at an interest rate, and
          evidenced by a promissory note which specifies, among other things, the
          principal amount of money borrowed, the interest rate the lender is charging,
          and date of repayment. A loan entails the reallocation of the subject asset(s)
          for a period of time, between the lender and the borrower.
          </p>
          <p>
            In a loan, the borrower initially receives or borrows an amount of money,
          called the principal, from the lender, and is obligated to pay back or repay
          an equal amount of money to the lender at a later time. The loan is generally
          provided at a cost, referred to as interest on the debt, which provides an
          incentive for the lender to engage in the loan. In a legal loan, each of
          these obligations and restrictions is enforced by contract, which can also
          place the borrower under additional restrictions known as loan covenants.
          Although this article focuses on monetary loans, in practice any material
          object might be lent. Acting as a provider of loans is one of the
          principal tasks for financial institutions such as banks and credit
          card companies. For other institutions, issuing of debt contracts such
          as bonds is a typical source of funding.
          </p>
        </div>
      );
    } else if (this.state.currentPhase === 'Phase 2') {
      return (
        <div>
          <p>
          In finance, a loan is the lending of money from one individual, organization or
          entity to another individual, organization or entity. A loan is a debt provided
          by an organization or individual to another entity at an interest rate, and
          evidenced by a promissory note which specifies, among other things, the
          principal amount of money borrowed, the interest rate the lender is charging,
          and date of repayment. A loan entails the reallocation of the subject asset(s)
          for a period of time, between the lender and the borrower.
          </p>
          <p>
            In a loan, the borrower initially receives or borrows an amount of money,
          called the principal, from the lender, and is obligated to pay back or repay
          an equal amount of money to the lender at a later time. The loan is generally
          provided at a cost, referred to as interest on the debt, which provides an
          incentive for the lender to engage in the loan. In a legal loan, each of
          these obligations and restrictions is enforced by contract, which can also
          place the borrower under additional restrictions known as loan covenants.
          Although this article focuses on monetary loans, in practice any material
          object might be lent. Acting as a provider of loans is one of the
          principal tasks for financial institutions such as banks and credit
          card companies. For other institutions, issuing of debt contracts such
          as bonds is a typical source of funding.
          </p>
        </div>
      );
    } else if (this.state.currentPhase === 'Phase 3') {
      return (
        <div>
          <p>
          In finance, a loan is the lending of money from one individual, organization or
          entity to another individual, organization or entity. A loan is a debt provided
          by an organization or individual to another entity at an interest rate, and
          evidenced by a promissory note which specifies, among other things, the
          principal amount of money borrowed, the interest rate the lender is charging,
          and date of repayment. A loan entails the reallocation of the subject asset(s)
          for a period of time, between the lender and the borrower.
          </p>
          <p>
            In a loan, the borrower initially receives or borrows an amount of money,
          called the principal, from the lender, and is obligated to pay back or repay
          an equal amount of money to the lender at a later time. The loan is generally
          provided at a cost, referred to as interest on the debt, which provides an
          incentive for the lender to engage in the loan. In a legal loan, each of
          these obligations and restrictions is enforced by contract, which can also
          place the borrower under additional restrictions known as loan covenants.
          Although this article focuses on monetary loans, in practice any material
          object might be lent. Acting as a provider of loans is one of the
          principal tasks for financial institutions such as banks and credit
          card companies. For other institutions, issuing of debt contracts such
          as bonds is a typical source of funding.
          </p>
        </div>
      );
    }
    return (
      <div>
        <p>
        In finance, a loan is the lending of money from one individual, organization or
        entity to another individual, organization or entity. A loan is a debt provided
        by an organization or individual to another entity at an interest rate, and
        evidenced by a promissory note which specifies, among other things, the
        principal amount of money borrowed, the interest rate the lender is charging,
        and date of repayment. A loan entails the reallocation of the subject asset(s)
        for a period of time, between the lender and the borrower.
        </p>
        <p>
          In a loan, the borrower initially receives or borrows an amount of money,
        called the principal, from the lender, and is obligated to pay back or repay
        an equal amount of money to the lender at a later time. The loan is generally
        provided at a cost, referred to as interest on the debt, which provides an
        incentive for the lender to engage in the loan. In a legal loan, each of
        these obligations and restrictions is enforced by contract, which can also
        place the borrower under additional restrictions known as loan covenants.
        Although this article focuses on monetary loans, in practice any material
        object might be lent. Acting as a provider of loans is one of the
        principal tasks for financial institutions such as banks and credit
        card companies. For other institutions, issuing of debt contracts such
        as bonds is a typical source of funding.
        </p>
      </div>
    );
  }
}
