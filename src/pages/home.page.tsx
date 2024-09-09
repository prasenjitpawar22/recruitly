import { CompanyList } from "../components/lists/company.list";
import { AddCompanyModal } from "../components/modal/add-company.modal";

export function Home() {
    return (
        <>
            <AddCompanyModal />
            <CompanyList />
        </>
    )
}