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
    categoryAnchor.classList.add("tab");
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
  console.log(data.data);
};
const tabActiveToggler = (shouldHave) => {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.classList.remove("tab-active-custom");
  });
  const activeTab = document.querySelector(`#${shouldHave}`);
  activeTab.classList.add("tab-active-custom");
};
const displayNews = (articles, elementId) => {
  //active class toggler
  tabActiveToggler(elementId);
  //spinner
  //display articles
  articles.sort((a, b) => b.total_view - a.total_view);
  const articlesContainer = document.getElementById("articles-container");
  articlesContainer.innerHTML = "";
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
                name ? name : "Anonymous"
              }</div>

              </div>
              <div class="card-actions justify-end">
                <button class="btn gap-2">
                <i class="fa-solid fa-eye"></i>
                <div class="badge">${
                  totalView ? totalView + "+" : "No Views"
                }</div>
                </button>
                <button onclick="loadDetails('${postId}')" class="btn btn-primary">Show Details</button>
                </div>
    `;
    articlesContainer.append(articleDiv);
  });
};
loadCategory();
loadNews("01", "Breaking-News");
