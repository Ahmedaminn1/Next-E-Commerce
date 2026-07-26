import { render, screen } from "@testing-library/react";
import AllOrders from "./src/app/allorders/page";
import { getUserOrders } from "./src/app/_actions/orders.actions";
import { getUserId } from "./src/lib/auth";
import test from "node:test";

jest.mock("./src/app/_actions/orders.actions");
jest.mock("./src/lib/auth");

describe("AllOrders Component", () => {

  test("should render empty state when no orders", async () => {

    (getUserId as jest.Mock).mockResolvedValue("user123");
    (getUserOrders as jest.Mock).mockResolvedValue([]);

    const Component = await AllOrders();
    render(Component);

    expect(
      screen.getByText(/no orders found in your history/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/start shopping/i)
    ).toBeInTheDocument();

  });


  test("should render orders list", async () => {

    const mockOrders = [
      {
        _id: "abc12345",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        paymentMethodType: "card",
        isPaid: true,
        isDelivered: false,
        totalOrderPrice: 500,
        shippingAddress: {
          city: "Cairo",
          details: "Nasr City",
          phone: "01000000000"
        }
      }
    ];

    (getUserId as jest.Mock).mockResolvedValue("user123");
    (getUserOrders as jest.Mock).mockResolvedValue(mockOrders);

    const Component = await AllOrders();
    render(Component);

    expect(screen.getByText(/order/i)).toBeInTheDocument();

    expect(
      screen.getByText(/500 EGP/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/cairo/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/phone/i)
    ).toBeInTheDocument();

  });

});

function expect(arg0: any) {
  throw new Error("Function not implemented.");
}
