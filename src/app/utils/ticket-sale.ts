export function buyTicket() {
  if ('PaymentRequest' in window) {
    const networks = ['amex', 'jcb', 'visa'];

    const supportedInstruments = [{
      supportedMethods: 'basic-card',
      data: {
        supportedNetworks: networks,
        supportedTypes: ['debit', 'credit', 'prepaid']
      }
    }, {
      supportedMethods: 'https://apple.com/apple-pay',
      data: {
        version: 2,
        supportedNetworks: networks,
        countryCode: 'US',
        merchantIdentifier: 'itnext-summit-2018.sample',
        merchantCapabilities: ['supportsDebit', 'supportsCredit', 'supports3DS']
      }
    },
      {
        supportedMethods: 'https://google.com/pay',
        data: {
          environment: 'TEST',
          apiVersion: 2,
          apiVersionMinor: 0,
          merchantInfo: {
            // A merchant ID is available after approval by Google.
            // 'merchantId':'01234567890123456789',
            merchantName: 'Example Merchant'
          },
          allowedPaymentMethods: [{
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA']
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              // Check with your payment gateway on the parameters to pass.
              // @see {@link https://developers.google.com/pay/api/web/reference/object#Gateway}
              parameters: {
                'gateway': 'example',
                'gatewayMerchantId': 'exampleGatewayMerchantId'
              }
            }
          }]
        }
      }];

    const details = {
      total: {
        label: 'Early Bird Ticket', amount: {currency: 'EUR', value: '50.00'}
      },
      displayItems: [
        {
          label: 'Regular Ticket',
          amount: {currency: 'EUR', value: '99.00'}
        },
        {
          label: 'Early Bird Discount',
          amount: {currency: 'EUR', value: '-49.00'}
        }
      ]
    };

    const payment = new PaymentRequest(supportedInstruments, details);
    payment.show();
  }
}
