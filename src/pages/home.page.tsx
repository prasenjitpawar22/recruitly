import InlinePopup from "../components/forms/add-company-form-new";
import { CompanyList } from "../components/lists/company.list";

export function Home() {
    return (
        <>
            {/* <AddCompanyModal /> */}
            <InlinePopup />
            <CompanyList />
        </>
    )
}