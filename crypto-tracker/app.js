const shimmerContainer = document.querySelector(".shimmer-container");
const prevBtn = document.getElementById("prev-button");
const nextBtn = document.getElementById("next-button");
const searchBox = document.getElementById("search-box");
const searchIcon = document.querySelector(".search-icon");
const sortPriceAsc = document.getElementById("sort-price-asc");
const sortPriceDesc = document.getElementById("sort-price-desc");
const sortVolumeAsc = document.getElementById("sort-volume-asc");
const sortVolumeDesc = document.getElementById("sort-volume-desc");
const sortMarketAsc = document.getElementById("sort-market-asc");
const sortMarketDesc = document.getElementById("sort-market-desc");

// API request options
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": "CG-mDVVqLm5xBDjvcVq523LnAmB",
  },
};

const BASE_URL = "https://api.coingecko.com/api/v3";

// State variables
let coins = []; // Array to store coin data
let currentPage = 1; // Current page number for pagination

// Fetch coins from API

// Show shimmer effect during loading
const showShimmer = () => {
  shimmerContainer.style.display = "flex";
};

const hideShimmer = () => {
  shimmerContainer.style.display = "none";
};

// Retrieve favorites from localStorage
const getFavorites = () => JSON.parse(localStorage.getItem("favorites")) || [];

// Save favorites to localStorage
const saveFavorites = (favorites) =>
  localStorage.setItem("favorites", JSON.stringify(favorites));

// Handle favorite icon click
const handleFavoriteClick = (coinId) => {
  const favorites = toggleFavorite(coinId);
  saveFavorites(favorites);
  renderCoins(coins, currentPage, 10);
};

// Toggle favorite status
const toggleFavorite = (coinId) => {
  let favorites = getFavorites();
  if (favorites.includes(coinId)) {
    favorites = favorites.filter((id) => id !== coinId);
  } else {
    favorites.push(coinId);
  }
  return favorites;
};

// Handle "Prev" button click
const handlePrevButtonClick = async () => {
  if (currentPage > 1) {
    currentPage--;
    await fetchCoins(currentPage);
    renderCoins(coins, currentPage, 10);
    updatePaginationControls();
  }
};

// Handle "Next" button click
const handleNextButtonClick = async () => {
  currentPage++;
  await fetchCoins(currentPage);
  renderCoins(coins, currentPage, 10);
  updatePaginationControls();
};

// Update the state of "Prev" and "Next" buttons
const updatePaginationControls = () => {
  if (currentPage === 1) {
    prevBtn.disabled = true;
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.disabled = false;
    prevBtn.classList.remove("disabled");
  }

  if (coins.length < 10) {
    nextBtn.disabled = true;
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.disabled = false;
    nextBtn.classList.remove("disabled");
  }
};

// Debounce function
let debounceTimeout;
const debounce = (func, delay) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(func, delay);
};

// Sorting functions
const sortCoinsByPrice = (order) => {
  coins.sort((a, b) =>
    order === "asc"
      ? a.current_price - b.current_price
      : b.current_price - a.current_price
  );
  renderCoins(coins, currentPage, 10);
};

const sortCoinsByVolume = (order) => {
  coins.sort((a, b) =>
    order === "asc"
      ? a.total_volume - b.total_volume
      : b.total_volume - a.total_volume
  );
  renderCoins(coins, currentPage, 10);
};

const sortCoinsByMarketCap = (order) => {
  coins.sort((a, b) =>
    order === "asc" ? a.market_cap - b.market_cap : b.market_cap - a.market_cap
  );
  renderCoins(coins, currentPage, 10);
};

sortPriceAsc.addEventListener("click", () => sortCoinsByPrice("asc"));
sortPriceDesc.addEventListener("click", () => sortCoinsByPrice("desc"));
sortVolumeAsc.addEventListener("click", () => sortCoinsByVolume("asc"));
sortVolumeDesc.addEventListener("click", () => sortCoinsByVolume("desc"));
sortMarketAsc.addEventListener("click", () => sortCoinsByMarketCap("asc"));
sortMarketDesc.addEventListener("click", () => sortCoinsByMarketCap("desc"));

const fetchCoins = async (page = 1) => {
  try {
    showShimmer(); // Show loading effect
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}`,
      options
    );
    coins = await response.json();
  } catch (err) {
    console.error(err);
  } finally {
    hideShimmer(); // Hide loading effect
  }
  return coins;
};

// Render a single coin row
const renderCoins = (coinsToDisplay, page, itemsPerPage) => {
  const start = (page - 1) * itemsPerPage + 1;
  const favorites = getFavorites();
  const tableBody = document.querySelector("#crypto-table tbody");
  tableBody.innerHTML = "";

  coinsToDisplay.forEach((coin, index) => {
    const row = renderCoinRow(coin, index, start, favorites);
    attachRowEvents(row, coin.id);
    tableBody.appendChild(row);
  });
};

// Create a coin row
const renderCoinRow = (coin, index, start, favorites) => {
  const isFavorite = favorites.includes(coin.id);
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>${start + index}</td>
        <td><img src="${coin.image ?? coin.thumb}" alt="${
    coin.name
  }" width="24" height="24" /></td>
        <td>${coin.name}</td>
        <td>$${coin.current_price?.toLocaleString() ?? ""}</td>
        <td>$${coin.total_volume?.toLocaleString() ?? ""}</td>
        <td>$${coin.market_cap?.toLocaleString() ?? ""}</td>
        <td>
            <i class="fas fa-star favorite-icon ${
              isFavorite ? "favorite" : ""
            }" data-id="${coin.id}"></i>
        </td>
    `;
  return row;
};

// Attach events to a coin row
const attachRowEvents = (row, coinId) => {
  row.addEventListener("click", (event) => {
    if (!event.target.classList.contains("favorite-icon")) {
      window.location.href = `coin/coin.html?id=${coinId}`;
    }
  });
  row.querySelector(".favorite-icon").addEventListener("click", (event) => {
    event.stopPropagation();
    handleFavoriteClick(coinId);
  });
};

// Initialize the page
const initializePage = async () => {
  await fetchCoins(currentPage);
  renderCoins(coins, currentPage, 10);
  updatePaginationControls(); // Ensure pagination controls are updated on load
};

// Fetch and display search results
const fetchSearchResults = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search?query=${query}`, options);
    const data = await response.json();
    const filteredCoins = data.coins.map((coin) => coin.id);
    const resData = await fetchSearchedItems(filteredCoins);
    return resData;
  } catch (err) {
    console.error("Error fetching search results:", err);
    return [];
  }
};

const fetchSearchedItems = async (ids) => {
  try {
    showShimmer(); // Show shimmer effect before fetching data
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(
        ","
      )}`,
      options
    );

    const fetchedCoins = await response.json();
    hideShimmer(); // Hide shimmer effect after data is fetched

    return fetchedCoins;
  } catch (err) {
    console.error(err);
    hideShimmer(); // Ensure shimmer is hidden in case of an error
  }
};

// Handle search input with debounce
const handleSearchInput = () => {
  debounce(async () => {
    const searchTerm = searchBox.value.trim();
    if (searchTerm) {
      const result = await fetchSearchResults(searchTerm);
      renderCoins(result, currentPage, result.length);
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    }
  }, 300);
};

// Event listeners for search and pagination
document.addEventListener("DOMContentLoaded", initializePage);
searchBox.addEventListener("input", handleSearchInput);
searchIcon.addEventListener("click", handleSearchInput);
prevBtn.addEventListener("click", handlePrevButtonClick);
nextBtn.addEventListener("click", handleNextButtonClick);
