export const getRBTCprice = () => {
    return (
        fetch('https://api.coingecko.com/api/v3/coins/rootstock?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false')
            .then(res => res.json())
            .then(res => res.market_data.current_price.usd)
            .catch(err => console.log(err))
    )
}