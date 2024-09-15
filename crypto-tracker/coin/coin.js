document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const coinId = urlParams.get('id');
    const apiKey = 'CG-mDVVqLm5xBDjvcVq523LnAmB';
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': apiKey }
    };

    const coinContainer = document.getElementById('coin-container');
    const shimmerContainer = document.querySelector('.shimmer-container');

    const coinImage = document.getElementById('coin-image');
    const coinName = document.getElementById('coin-name');
    const coinDescription = document.getElementById('coin-description');
    const coinRank = document.getElementById('coin-rank');
    const coinPrice = document.getElementById('coin-price');
    const coinMarketCap = document.getElementById('coin-market-cap');
    const addToFavBtn = document.getElementById('add-to-fav-btn');

    const showShimmer = () => {
        shimmerContainer.style.display = 'flex';
        coinContainer.style.display = 'none';
    };

    const hideShimmer = () => {
        shimmerContainer.style.display = 'none';
        coinContainer.style.display = 'flex';
    };

    async function fetchCoinData() {
        showShimmer(); // Show shimmer effect before fetching data
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
            const data = await response.json();
            displayCoinData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            hideShimmer(); // Hide shimmer effect after data is fetched
        }
    }

    function displayCoinData(coin) {
        coinImage.src = coin.image.large;
        coinImage.alt = coin.name;
        coinName.textContent = coin.name;
        coinDescription.innerHTML = coin.description.en.split(". ")[0] + '.';
        coinRank.textContent = coin.market_cap_rank;
        coinPrice.textContent = `$${coin.market_data.current_price.usd.toLocaleString()}`;
        coinMarketCap.textContent = `$${coin.market_data.market_cap.usd.toLocaleString()}`;

        // Check if the coin is in favorites and update button text
        const favorites = getFavorites();
        if (favorites.includes(coinId)) {
            addToFavBtn.textContent = 'Remove from Favorites';
        } else {
            addToFavBtn.textContent = 'Add to Favorites';
        }
    }

    // Retrieve favorites from localStorage
    const getFavorites = () => JSON.parse(localStorage.getItem('favorites')) || [];

    // Save favorites to localStorage
    const saveFavorites = (favorites) => localStorage.setItem('favorites', JSON.stringify(favorites));

    // Handle favorite button click
    const handleFavoriteClick = () => {
        const favorites = toggleFavorite(coinId);
        saveFavorites(favorites);
        // Update button text after toggling favorite status
        addToFavBtn.textContent = favorites.includes(coinId) ? 'Remove from Favorites' : 'Add to Favorites';
    };

    // Toggle favorite status
    const toggleFavorite = (coinId) => {
        let favorites = getFavorites();
        if (favorites.includes(coinId)) {
            favorites = favorites.filter(id => id !== coinId);
        } else {
            favorites.push(coinId);
        }
        return favorites;
    };

    await fetchCoinData();

    const ctx = document.getElementById('coinChart').getContext('2d');
    let coinChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Price (USD)',
                data: [],
                borderColor: '#EEBC1D',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                },
                y: {
                    display: true,
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return `$${value}`;
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `$${context.parsed.y}`;
                        }
                    }
                }
            }
        }
    });

    async function fetchChartData(days) {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`, options);
            const data = await response.json();
            updateChart(data.prices);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function updateChart(prices) {
        const labels = prices.map(price => {
            let date = new Date(price[0]);
            return date.toLocaleDateString();
        });
        const data = prices.map(price => price[1]);

        coinChart.data.labels = labels;
        coinChart.data.datasets[0].data = data;
        coinChart.update();
    }

    const buttons = document.querySelectorAll('.button-container button');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            const days = event.target.id === '24h' ? 1 : (event.target.id === '30d' ? 30 : 90);
            fetchChartData(days);
        });
    });

    // Fetch default chart data for 24h
    document.getElementById('24h').click();

    // Add event listener for the "Add to Favorites" button
    addToFavBtn.addEventListener('click', handleFavoriteClick);
});
