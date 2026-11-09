import type { BlogPostMeta } from '@/types/blog';

export const meta: BlogPostMeta = {
  slug: 'gst-compliance-checklist-india',
  title: 'GST Compliance Checklist for Indian Businesses',
  description:
    'A clear, practical checklist covering GST registration, invoice requirements, GSTR-1 and GSTR-3B filings, input tax credit, e-way bills, and the annual return — with common compliance mistakes to avoid.',
  publishedAt: '2026-11-24',
  category: 'financial-compliance',
  tags: ['gst', 'compliance', 'taxation', 'india', 'gstr'],
  author: 'OneSpheree Financial & Compliance Team',
  authorRole: 'Financial & Compliance Practice',
  readingTime: 8,
  toc: [
    { id: 'gst-registration', title: 'GST Registration', level: 2 },
    { id: 'invoice-requirements', title: 'Invoice Requirements', level: 2 },
    { id: 'filing-gstr1', title: 'Filing GSTR-1', level: 2 },
    { id: 'filing-gstr3b', title: 'Filing GSTR-3B', level: 2 },
    { id: 'input-tax-credit', title: 'Input Tax Credit (ITC)', level: 2 },
    { id: 'e-way-bills', title: 'E-Way Bills', level: 2 },
    { id: 'annual-return', title: 'Annual Return (GSTR-9)', level: 2 },
    { id: 'common-mistakes', title: 'Common Compliance Mistakes', level: 2 },
    { id: 'working-with-a-ca', title: 'Working with a GST Consultant', level: 2 },
  ],
  draft: false,
};

export default function Article() {
  return (
    <>
      <p>
        Goods and Services Tax (GST) compliance is a recurring responsibility
        for virtually every registered business in India. Getting it right
        means meeting filing deadlines, maintaining accurate records, managing
        input tax credit correctly, and staying current with procedural and
        regulatory updates.
      </p>
      <p>
        This checklist is structured around the main areas of GST compliance
        that businesses need to manage on an ongoing basis. Use it as a
        reference alongside advice from your accountant or GST consultant, since
        specific requirements vary by business type, turnover, and the nature
        of your supplies.
      </p>

      <div className="callout callout-warning">
        <strong>Note:</strong> GST rules, thresholds, and due dates change
        periodically. Always verify current requirements from the official GST
        portal (gstn.org.in) or a qualified GST professional. This article is
        a general reference only and does not constitute tax advice.
      </div>

      <h2 id="gst-registration">GST Registration</h2>
      <p>
        GST registration is mandatory for businesses that cross the prescribed
        turnover threshold, as well as for certain categories of businesses
        regardless of turnover (including e-commerce sellers, inter-state
        suppliers, and others specified in the GST law).
      </p>
      <ul>
        <li>
          <strong>Registration status:</strong> Confirm that your GSTIN
          (Goods and Services Tax Identification Number) is active and reflects
          your current business details — legal name, principal place of
          business, and any additional places of business.
        </li>
        <li>
          <strong>Amendment of registration:</strong> Any change in core
          business details — change in address, addition of a business location,
          change in authorised signatory — should be updated in your GST
          registration within the prescribed period.
        </li>
        <li>
          <strong>Multiple registrations:</strong> Businesses operating in
          more than one state or union territory must hold a separate GST
          registration for each state/UT in which they have a business
          presence.
        </li>
        <li>
          <strong>Composition scheme:</strong> Small businesses below the
          prescribed turnover limit may be registered under the composition
          scheme, which involves a different set of compliance requirements.
          Confirm that your registration category is appropriate for your
          current business model and turnover.
        </li>
      </ul>

      <h2 id="invoice-requirements">Invoice Requirements</h2>
      <p>
        A valid GST invoice is the foundation of the GST compliance chain.
        Errors in invoicing can affect your customers' ability to claim input
        tax credit and may attract scrutiny during assessments.
      </p>
      <ul>
        <li>
          <strong>Mandatory fields:</strong> Every tax invoice must include
          the supplier's GSTIN, the recipient's GSTIN (for B2B supplies),
          the invoice number and date, the description and quantity of goods
          or services, the taxable value, the applicable GST rate, and the
          amount of CGST, SGST/UTGST, or IGST separately.
        </li>
        <li>
          <strong>Invoice numbering:</strong> Invoice numbers must be
          sequential within a financial year. Gaps in invoice numbering can
          raise questions during assessment.
        </li>
        <li>
          <strong>HSN/SAC codes:</strong> Harmonised System of Nomenclature
          (HSN) codes for goods and Service Accounting Codes (SAC) for services
          are required on invoices based on the supplier's annual aggregate
          turnover.
        </li>
        <li>
          <strong>Time of issue:</strong> Tax invoices should be issued within
          the time limits prescribed under the GST law — typically before or at
          the time of supply or removal of goods.
        </li>
        <li>
          <strong>Debit and credit notes:</strong> When adjustments to
          previously issued invoices are required, the correct mechanism is a
          debit note or credit note (not a revised invoice) and these must be
          reported in the appropriate return.
        </li>
      </ul>

      <h2 id="filing-gstr1">Filing GSTR-1</h2>
      <p>
        GSTR-1 is the statement of outward supplies — it reports all sales
        made during the period. It is the primary document through which
        your customers' GSTR-2B (auto-populated input credit statement) is
        generated.
      </p>
      <ul>
        <li>
          <strong>Filing frequency:</strong> Monthly for businesses above the
          prescribed quarterly turnover threshold; quarterly under the QRMP
          (Quarterly Return Monthly Payment) scheme for eligible smaller
          taxpayers. Confirm your applicable filing frequency.
        </li>
        <li>
          <strong>B2B invoices:</strong> Report each invoice issued to a
          registered recipient separately, with the recipient's GSTIN and
          invoice-level details.
        </li>
        <li>
          <strong>B2C supplies:</strong> Report consolidated B2C supplies
          in the appropriate summary sections based on value and whether the
          supply is intra-state or inter-state.
        </li>
        <li>
          <strong>Amendments:</strong> Invoices from previous periods that
          need to be amended should be reported in the amendments section, not
          as new records.
        </li>
        <li>
          <strong>Due date:</strong> File GSTR-1 before the applicable due
          date, since late filing affects your customers' ability to claim ITC
          from your invoices.
        </li>
      </ul>

      <h2 id="filing-gstr3b">Filing GSTR-3B</h2>
      <p>
        GSTR-3B is the monthly or quarterly summary return in which you report
        your consolidated outward supplies, eligible input tax credit, and net
        GST liability, and make the tax payment.
      </p>
      <ul>
        <li>
          <strong>Outward supplies summary:</strong> Report total taxable
          outward supplies under the correct tax head (IGST / CGST+SGST /
          UTGST).
        </li>
        <li>
          <strong>ITC claimed:</strong> Report eligible ITC as per GSTR-2B,
          distinguishing between ITC on inputs, capital goods, and input
          services.
        </li>
        <li>
          <strong>ITC reversals:</strong> Identify and report any ITC that
          needs to be reversed in the period — for example, on exempt supplies
          or ineligible categories.
        </li>
        <li>
          <strong>Tax payment:</strong> Pay any net GST liability — after
          applying ITC — using the electronic cash ledger. Ensure that the
          payment is made before the filing deadline to avoid interest.
        </li>
        <li>
          <strong>Consistency with GSTR-1:</strong> The figures in GSTR-3B
          should be consistent with the invoice-level data reported in
          GSTR-1.
        </li>
      </ul>

      <h2 id="input-tax-credit">Input Tax Credit (ITC)</h2>
      <p>
        Input tax credit — the ability to offset GST paid on purchases against
        GST collected on sales — is a key feature of the GST system. Managing
        ITC correctly is both an opportunity and a compliance obligation.
      </p>
      <ul>
        <li>
          <strong>Eligibility:</strong> ITC is available only on goods and
          services used for business purposes and for taxable supplies. It is
          not available on certain specified categories (such as motor vehicles
          for personal use, food and beverages, and others listed in the GST
          law).
        </li>
        <li>
          <strong>Reconciliation with GSTR-2B:</strong> ITC should be claimed
          based on what is reflected in your auto-generated GSTR-2B statement.
          ITC on invoices not reflected in GSTR-2B (because the supplier has
          not filed GSTR-1) is subject to restrictions.
        </li>
        <li>
          <strong>ITC on capital goods:</strong> ITC on capital goods may be
          available in full in the year of purchase or spread over time,
          depending on the category. Understand the applicable rules for your
          type of capital goods.
        </li>
        <li>
          <strong>Time limit for claiming ITC:</strong> ITC must be claimed
          within the time limits prescribed in the GST law. ITC that is not
          claimed within the applicable period is forfeited.
        </li>
        <li>
          <strong>Records:</strong> Maintain supporting records for all ITC
          claimed — purchase invoices, import documents, and debit notes — as
          these may be required during assessment.
        </li>
      </ul>

      <h2 id="e-way-bills">E-Way Bills</h2>
      <p>
        An e-way bill is an electronic document required for the movement of
        goods in India above the prescribed value threshold. It is generated
        on the e-way bill portal (ewaybillgst.gov.in) before the commencement
        of goods movement.
      </p>
      <ul>
        <li>
          <strong>When required:</strong> E-way bills are required for
          inter-state movement of goods above the prescribed value threshold,
          and for intra-state movement in states and for goods categories
          where state-specific rules apply.
        </li>
        <li>
          <strong>Generation:</strong> The e-way bill must be generated before
          the movement of goods commences, by the supplier, recipient, or
          transporter as applicable.
        </li>
        <li>
          <strong>Validity:</strong> E-way bills have a validity period based
          on the distance of transportation. Ensure that movement is completed
          within the validity period or that the e-way bill is extended where
          necessary.
        </li>
        <li>
          <strong>Part B details:</strong> Vehicle or transporter details
          (Part B) must be updated on the e-way bill portal when goods are
          handed over to the transporter.
        </li>
        <li>
          <strong>Retention:</strong> Copies of all generated e-way bills
          should be retained as part of your records.
        </li>
      </ul>

      <h2 id="annual-return">Annual Return (GSTR-9)</h2>
      <p>
        GSTR-9 is the annual GST return that reconciles the details reported
        across your monthly or quarterly returns for the financial year. It
        provides an opportunity to identify and correct discrepancies before
        the period is closed.
      </p>
      <ul>
        <li>
          <strong>Applicability:</strong> GSTR-9 is required for regular
          taxpayers above the prescribed annual aggregate turnover threshold.
          Check the current applicability thresholds, as these are revised
          periodically.
        </li>
        <li>
          <strong>Reconciliation:</strong> Reconcile the annual figures for
          outward supplies (from GSTR-1), ITC claimed (from GSTR-3B), and
          actual tax paid to identify any differences that need to be addressed.
        </li>
        <li>
          <strong>Additional liability:</strong> If the annual return reveals
          that additional tax is payable, this should be paid along with
          applicable interest.
        </li>
        <li>
          <strong>GSTR-9C:</strong> Businesses above a higher turnover
          threshold are also required to file GSTR-9C, a reconciliation
          statement certified by a chartered accountant.
        </li>
      </ul>

      <h2 id="common-mistakes">Common Compliance Mistakes</h2>
      <p>
        Several categories of error recur consistently in GST compliance.
        Being aware of them helps you put checks in place to avoid them.
      </p>
      <ul>
        <li>
          Claiming ITC on invoices that are not reflected in GSTR-2B or that
          are ineligible under the GST law
        </li>
        <li>
          Filing GSTR-3B with figures that do not reconcile with GSTR-1,
          creating discrepancies that attract scrutiny
        </li>
        <li>
          Missing filing deadlines, which results in late fees and interest and
          can affect your customers' ITC
        </li>
        <li>
          Incorrect classification of supplies — applying the wrong GST rate or
          treating taxable supplies as exempt
        </li>
        <li>
          Failing to issue invoices with correct HSN/SAC codes or mandatory
          fields, creating issues for customers claiming ITC
        </li>
        <li>
          Not updating GST registration when business details change —
          incorrect information on the registration can cause problems during
          assessment
        </li>
        <li>
          Failing to generate e-way bills for qualifying goods movements,
          which can result in goods being detained in transit
        </li>
      </ul>

      <h2 id="working-with-a-ca">Working with a GST Consultant</h2>
      <p>
        For businesses with significant transaction volumes, operations in
        multiple states, or complex supply structures, managing GST compliance
        in-house is demanding and the risk of errors is higher. A qualified
        GST consultant or chartered accountant with GST expertise can take
        responsibility for routine filing, reconciliation, and advisory work,
        and represent your business in the event of notices or assessments.
      </p>
      <p>
        OneSpheree's{' '}
        <a href="/services/financial-compliance">
          financial and compliance services
        </a>{' '}
        support businesses with GST compliance management, reconciliation, and
        advisory — helping ensure that filings are accurate, deadlines are met,
        and ITC is properly managed.
      </p>
    </>
  );
}
