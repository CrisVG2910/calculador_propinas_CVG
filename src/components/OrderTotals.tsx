import { useMemo } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalsProps = {
  order: OrderItem[],
  tip: number,
  totalPago: number,
  placeOrder: () => void
}

export default function OrderTotals({order, tip, totalPago, placeOrder} : OrderTotalsProps) {

  const subtotalAmount = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])
  const tipAmount = useMemo(() => subtotalAmount * tip, [tip, order])
  const total = useMemo(() => subtotalAmount + tipAmount, [tip, order, totalPago])


  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Total + Propina:</h2>
        <p>Subtotal a pagar: {''}
          <span className="font-bold">{ formatCurrency(subtotalAmount)}</span>
        </p>

        <p>Propina: {''}
          <span className="font-bold">{ formatCurrency(tipAmount)}</span>
        </p>

        <p>Total a Pagar: {''}
          <span className="font-bold">{ formatCurrency(total)}</span>
        </p>
      </div>

      <button
        className="w-full bg-teal-400 p-3 uppercase text-white font-bold mt-10 disabled:opacity-20"
        disabled={total === 0}
        onClick={placeOrder}
      >
        Guardar Orden  
      </button> 
    </>
  )
}
