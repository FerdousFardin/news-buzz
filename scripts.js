const searchAtc = (shouldProgress = false) => {
  const searchAct = document.getElementById("search-active");
  if (shouldProgress) {
    searchAct.classList.remove("hidden");
    searchAct.classList.add("flex");
  } else {
    searchAct.classList.add("hidden");
    searchAct.classList.remove("flex");
  }
};
searchAtc(true);
const loadCategory = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/categories#`
  );
  const data = await res.json();
  displayCategory(data.data.news_category);
};
const displayCategory = (categories) => {
  //   console.log(categories);
  const categoryContainer = document.getElementById("category-nav");

  categories.forEach((category) => {
    const { category_id: categoryId, category_name: categoryName } = category;
    const elementId = categoryName.split(" ").join("-");
    // console.log(elementId);
    const categoryAnchor = document.createElement("a");
    categoryAnchor.classList.add("tab", "text-xl", "font-medium");
    // categoryAnchor.classList.toggle("tab-active");
    categoryAnchor.setAttribute(
      "onclick",
      `loadNews('${categoryId}','${elementId}')`
    );
    categoryAnchor.setAttribute("id", `${elementId}`);
    categoryAnchor.innerText = categoryName;
    categoryContainer.append(categoryAnchor);
  });
};
const loadNews = async (categoryId, elementId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${categoryId}`
  );
  const data = await res.json();

  displayNews(data.data, elementId);
};
const loadDetails = async (postId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/${postId}`
  );
  const data = await res.json();
  displayDetails(data.data[0]);
};

const categoryTitle = (category) => {
  const categoryTitle = document.getElementById("category-title");
  categoryTitle.textContent = category;
};
const totalNewsSet = (num) => {
  const setField = document.getElementById("total-items");
  setField.innerHTML = num
    ? num
    : `<i class="fa-solid fa-triangle-exclamation"></i> No`;
};

const tabActiveToggler = (shouldHave) => {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.classList.remove("tab-active-custom");
  });
  const activeTab = document.querySelector(`#${shouldHave}`);
  activeTab.classList.add("tab-active-custom");
};
const displayDetails = (article) => {
  const modalContainer = document.getElementById("modal-section");
  modalContainer.textContent = "";
  const { title, image_url: mainImg, details } = article;
  const modalLabel = document.createElement("label");
  modalLabel.classList.add("modal-box", "relative");
  modalLabel.innerHTML = `
  <img src="${mainImg}" alt="Album" />
  <h3 class="text-lg font-bold my-2">${title}</h3>
    <p class="py-4">${details}</p>
  `;
  modalContainer.append(modalLabel);
};
const displayNews = (articles, elementId) => {
  //active class toggler
  tabActiveToggler(elementId);
  // totalNewsSet
  totalNewsSet(articles.length);
  //Category Title
  categoryTitle(elementId);
  //spinner
  searchAtc(true);
  //display articles
  articles.sort((a, b) => b.total_view - a.total_view);
  const articlesContainer = document.getElementById("articles-container");
  articlesContainer.innerHTML = "";
  if (articles.length === 0) {
    document.getElementById("not-found-section").classList.remove("hidden");
    document
      .getElementById("alert-custom-bg")
      .classList.add("bg-secondary-focus");
    document.getElementById("alert-custom-bg").classList.remove("bg-base-300");
    searchAtc();
  } else {
    document.getElementById("not-found-section").classList.add("hidden");
    document
      .getElementById("alert-custom-bg")
      .classList.remove("bg-secondary-focus");
    document.getElementById("alert-custom-bg").classList.remove("bg-base-300");
  }
  articles.forEach((article) => {
    const {
      _id: postId,
      others_info: { is_todays_pick, is_trending },
      total_view: totalView,
      title,
      author: { name, img: authorImg },
      thumbnail_url: thumbnailImg,
      details,
    } = article;

    const articleDiv = document.createElement("div");
    articleDiv.classList.add(
      "card",
      "lg:card-side",
      "bg-base-300",
      "shadow-xl"
    );
    articleDiv.innerHTML = `
    <figure>
              <img src="${thumbnailImg}" alt="Album" />
            </figure>
            <div class="card-body">
            
              <h2 class="card-title">${title}<span class="flex gap-1"><div class="badge lg:badge-lg">${
      is_todays_pick ? "Todays Pick" : "Latest"
    }</div>
                <div class="badge lg:badge-lg badge-outline">${
                  is_trending ? "Trending Now" : "News"
                }</div></span></h2>
              <p>${
                details.length > 300 ? details.slice(0, 250) + "..." : details
              }</p>
              <div class="flex gap-2 my-2">
            <div class="avatar">
              <div class="w-12 rounded-full">
                <img src="${authorImg}" />
              </div>
              </div>
              <div class="badge badge-accent lg:badge-lg lg:font-semibold self-center">${
                name ? name : "No Author Info Found!"
              }</div>

              </div>
              <div class="card-actions justify-end">
                <button class="btn gap-2">
                <i class="fa-solid fa-eye"></i>
                <div class="badge">${
                  totalView ? totalView + "+" : "No Views"
                }</div>
                </button>
                <label for="my-modal-4" onclick="loadDetails('${postId}')" class="btn btn-primary modal-button"><i class="fa-solid fa-circle-info mr-2"></i> Show Details</label>
                </div>
    `;
    articlesContainer.append(articleDiv);
    searchAtc();
  });
};
loadCategory();
loadNews("01", "Breaking-News");
