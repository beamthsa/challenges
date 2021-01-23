import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import paymentAPI from '~api/payment'
import charityAPI from '~api/charity'
import { summaryDonations } from '~helpers/donation'

const Card = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
`

export default connect((state) => state)(
    class App extends Component {
    state = {
        charities: [],
        selectedAmount: 10,
    };

    componentDidMount() {
        const self = this
        charityAPI.getAll()
            .then(function (data) {
                self.setState({ charities: data })
            })

        paymentAPI.getAll()
            .then(function (data) {
                self.props.dispatch({
                    type: 'UPDATE_TOTAL_DONATE',
                    amount: summaryDonations(data.map((item) => item.amount)),
                })
            })
    }

    render() {
        const self = this
        const cards = this.state.charities.map(function (item, i) {
            const payments = [10, 20, 50, 100, 500].map((amount, j) => (
                <label key={j}>
                    <input
                        type="radio"
                        name="payment"
                        onClick={function () {
                            self.setState({ selectedAmount: amount })
                        }}
                    />
                    {amount}
                </label>
            ))

            return (
                <Card key={i}>
                    <p>{item.name}</p>
                    {payments}
                    <button
                        onClick={handlePay.call(
                            self,
                            item.id,
                            self.state.selectedAmount,
                            item.currency
                        )}
                    >
              Pay
                    </button>
                </Card>
            )
        })

        const style = {
            color: 'red',
            margin: '1em 0',
            fontWeight: 'bold',
            fontSize: '16px',
            textAlign: 'center',
        }

        const donate = this.props.donate
        const message = this.props.message

        return (
            <div>
                <h1>Tamboon React</h1>
                <p>All donations: {donate}</p>
                <p style={style}>{message}</p>
                {cards}
            </div>
        )
    }
    }
)

/**
 * Handle pay button
 * 
 * @param {*} The charities Id
 * @param {*} amount The amount was selected
 * @param {*} currency The currency
 * 
 * @example
 * fetch('http://localhost:3001/payments', {
      method: 'POST',
      body: `{ "charitiesId": ${id}, "amount": ${amount}, "currency": "${currency}" }`,
    })
 */
function handlePay(id, amount, currency) {}
