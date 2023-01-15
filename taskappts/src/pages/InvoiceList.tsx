import { useAppContext } from "../context/AppContext";
import React from "react";
import { HiOutlineTrash } from "react-icons/Hi";
import OverwiewNav from "../components/OverweiwNav";
import { Outlet, Link } from "react-router-dom";
function InvoiceList() {
  const { invoices, deleteInvoice } = useAppContext();
  return (
    <main className="bodyDiv">
      <Outlet />
      <OverwiewNav />

      <h2>Invoices</h2>

      <table>
        <thead>
          <tr>
            <th>Customer </th>
            <th>Days left</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice: any) => (
            <tr key={invoice.id}>
              <td>{invoice.customer}</td>
              <td>{invoice.daysLeft}</td>
              <td>{invoice.totalPrice}</td>
              <td>
                {invoice.status}{" "}
                <button onClick={() => deleteInvoice(invoice.id)}>
                  <HiOutlineTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default InvoiceList;
