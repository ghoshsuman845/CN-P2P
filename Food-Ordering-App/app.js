const restaurants = [
  {
    id: "1",
    name: "Green Curry",
    location: "Mexico",
    rating: "3.5",
    eta: "25",
    tags: ["American", "Mexican", "French"],
    image:
      "https://raw.githubusercontent.com/ankitsaxena21/Food-Ordering-App/master/assets/media/images/restaurant-1.webp",
    favourite: "false",
  },
  {
    id: "2",
    name: "Bangalore Spices",
    location: "Bangalore",
    rating: "4",
    eta: "20",
    tags: ["Chinese", "Indian", "French"],
    image:
      "https://raw.githubusercontent.com/ankitsaxena21/Food-Ordering-App/master/assets/media/images/restaurant-2.webp",
    favourite: "false",
  },
  {
    id: "3",
    name: "Paterro’s Kitchen",
    location: "Paris",
    rating: "3",
    eta: "30",
    tags: ["American", "Italian", "French"],
    image:
      "https://raw.githubusercontent.com/ankitsaxena21/Food-Ordering-App/master/assets/media/images/restaurant-3.webp",
    favourite: "false",
  },
  {
    id: "4",
    name: "Grassfed Grill",
    location: "Delhi",
    rating: "3.5",
    eta: "22",
    tags: ["American", "French"],
    image:
      "https://raw.githubusercontent.com/ankitsaxena21/Food-Ordering-App/master/assets/media/images/restaurant-4.webp",
    favourite: "false",
  },
  {
    id: "5",
    name: "Hunger Killers",
    location: "Delhi",
    rating: "4.5",
    eta: "18",
    tags: ["American", "Indian"],
    image:
      "https://raw.githubusercontent.com/ankitsaxena21/Food-Ordering-App/master/assets/media/images/restaurant-5.webp",
    favourite: "false",
  },
  {
    id: "6",
    name: "Indian Tadka",
    location: "New York",
    rating: "3.8",
    eta: "25",
    tags: ["Indian", "French"],
    image:
      "https://raw.githubusercontent.com/ankitsaxena21/Food-Ordering-App/master/assets/media/images/restaurant-6.webp",
    favourite: "false",
  },
  {
    id: "7",
    name: "Street Deli",
    location: "Delhi",
    rating: "3.4",
    eta: "33",
    tags: ["Indian"],
    image:
      "https://raw.githubusercontent.com/ankitsaxena21/Food-Ordering-App/master/assets/media/images/restaurant-7.webp",
    favourite: "false",
  },
  {
    id: "8",
    name: "Spicella Spanish Kitchen",
    location: "Madrid",
    rating: "2.8",
    eta: "35",
    tags: ["American", "Indian", "French"],
    image:
      "https://raw.githubusercontent.com/ankitsaxena21/Food-Ordering-App/master/assets/media/images/restaurant-8.webp",
    favourite: "false",
  },
  {
    id: "9",
    name: "Sweet Escape",
    location: "Delhi",
    rating: "4.1",
    eta: "20",
    tags: ["American", "Chinese", "French"],
    image:
      "https://raw.githubusercontent.com/ankitsaxena21/Food-Ordering-App/master/assets/media/images/restaurant-9.webp",
    favourite: "false",
  },
  {
    id: "10",
    name: "Veganic Corner",
    location: "Delhi",
    rating: "3.7",
    eta: "25",
    tags: ["American", "Chinese", "French"],
    image:
      "https://raw.githubusercontent.com/ankitsaxena21/Food-Ordering-App/master/assets/media/images/restaurant-10.webp",
    favourite: "false",
  },
  {
    id: "11",
    name: "Island Grill",
    location: "Delhi",
    rating: "3.5",
    eta: "34",
    tags: ["American", "Chinese", "French"],
    image:
      "https://raw.githubusercontent.com/ankitsaxena21/Food-Ordering-App/master/assets/media/images/restaurant-11.webp",
    favourite: "false",
  },
  {
    id: "12",
    name: "Flavoroso",
    location: "Mumbai",
    rating: "3.5",
    eta: "30",
    tags: ["American", "Mexican", "French"],
    image:
      "https://raw.githubusercontent.com/ankitsaxena21/Food-Ordering-App/master/assets/media/images/restaurant-12.webp",
    favourite: "false",
  },
  {
    id: "13",
    name: "El Pirata",
    location: "Firenze",
    rating: "4.7",
    eta: "30",
    tags: ["American", "Indian", "French"],
    image:
      "https://raw.githubusercontent.com/ankitsaxena21/Food-Ordering-App/master/assets/media/images/restaurant-3.webp",
    favourite: "false",
  },
  {
    id: "14",
    name: "El Pirata Porch",
    location: "hawaii",
    rating: "3",
    eta: "35",
    tags: ["American", "Sea Food", "French", "Italian"],
    image:
      "https://raw.githubusercontent.com/ankitsaxena21/Food-Ordering-App/master/assets/media/images/restaurant-14.webp",
    favourite: "false",
  },
  {
    id: "15",
    name: "Sea Hunger",
    location: "Goa",
    rating: "4",
    eta: "40",
    tags: ["American", "Sea Food", "French"],
    image:
      "https://raw.githubusercontent.com/ankitsaxena21/Food-Ordering-App/master/assets/media/images/restaurant-15.webp",
    favourite: "false",
  },
];

const searchBar = document.getElementById("search");
const sort = document.getElementById("sort");
const filter = document.getElementById("filter");

function displayRestaurants(filteredRestaurants) {
  const restaurantList = document.getElementById("restaurant-list");
  restaurantList.innerHTML = "";

  filteredRestaurants.forEach((restaurant) => {
    const div = document.createElement("div");
    div.innerHTML = `
         <div class="restaurant-details" id=${restaurant.id}>
           <div class="res-img">
               <img src=${restaurant.image} alt=${restaurant.image}>
           </div>
           <div class="res-name">
              <h2>${restaurant.name}</h2>
              <p>${restaurant.location}</p>
           </div>
           <div class="res-details">
               <p class="rating">
               <span><i class="fa-solid fa-star"></i></span>
               ${restaurant.rating}</p>
               <p class="eta">${restaurant.eta} mins</p>


           </div>
           <div class="tags">${restaurant.tags.join(", ")}</div>
         </div>
       `;
    restaurantList.appendChild(div);
  });
}

function filterAndSortRestaurants() {
  const searchQuery = searchBar.value.toLowerCase();
  const sortOption = sort.value;
  const filterOption = filter.value;
  let filteredRestaurants = restaurants.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(searchQuery) &&
      (filterOption === "all" || restaurant.tags.includes(filterOption))
    );
  });

  if (sortOption === "rating") {
    filteredRestaurants.sort(
      (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
    );
  } else if (sortOption === "eta") {
    filteredRestaurants.sort((a, b) => parseInt(a.eta) - parseInt(b.eta));
  }

  displayRestaurants(filteredRestaurants);
}

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const debouncedFilterAndSortRestaurants = debounce(
  filterAndSortRestaurants,
  300
);

searchBar.addEventListener("input", debouncedFilterAndSortRestaurants);

sort.addEventListener("change", filterAndSortRestaurants);
filter.addEventListener("change", filterAndSortRestaurants);

(() => {
  displayRestaurants(restaurants);
})();
