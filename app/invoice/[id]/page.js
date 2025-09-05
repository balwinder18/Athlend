import Invoice from "../../../components/Invoice";

export default async function InvoicePage({ params }) {

   const { id } = await params;

  return <Invoice id={id} />;
}
