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
  const articlesContainer = document.getElementById("articles-container");
  articlesContainer.innerHTML = "";
  articles.forEach((article) => {});
};
loadCategory();
