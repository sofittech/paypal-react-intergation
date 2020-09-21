import React from "react";

export default function ReactPayPal() {
  const [paid, setPaid] = React.useState(false);
  const [error, setError] = React.useState(null);
  const paypalRef1 = React.useRef();
  const paypalRef2 = React.useRef();
  const paypalRef3 = React.useRef();

  // To show PayPal buttons once the component loads
  React.useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Celx Green",
                amount: {
                  currency_code: "USD",
                  value: 0.99,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaid(true);
          console.log(order);
        },
        onError: (err) => {
        //   setError(err),
          console.error(err);
        },
      })
      .render(paypalRef1.current);

      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "Celx Red",
                  amount: {
                    currency_code: "USD",
                    value: 2.99,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            setPaid(true);
            console.log(order);
          },
          onError: (err) => {
          //   setError(err),
            console.error(err);
          },
        })
        .render(paypalRef2.current);



        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: "Celx Black",
                    amount: {
                      currency_code: "USD",
                      value: 4.99,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              setPaid(true);
              console.log(order);
            },
            onError: (err) => {
            //   setError(err),
              console.error(err);
            },
          })
          .render(paypalRef3.current);


  }, []);

  // If the payment has been made
  if (paid) {
    return <div>Payment successful.!</div>;
  }

  // If any error occurs
  if (error) {
    return <div>Error Occurred in processing payment.! Please try again.</div>;
  }

  // Default Render
  return (
    <div className="mainPaypal">
      <div className="obj">
        <h4>CELX Green</h4>
        <div ref={paypalRef1} />
        <hr />
      </div>

      <div className="obj">
        <h4>CELX Red</h4>
        <div ref={paypalRef2} />
        <hr />
      </div>

      <div className="obj">
        <h4>CELX Black</h4>
        <div ref={paypalRef3} />
        <hr />
      </div>
    </div>
  );
}
