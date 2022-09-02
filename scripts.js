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
  categoryContainer.innerHTML = "";
  categories.forEach((category) => {
    const { category_id: categoryId, category_name: categoryName } = category;
    const categoryAnchor = document.createElement("a");
    categoryAnchor.classList.add("tab");
    categoryAnchor.innerText = categoryName;
    categoryContainer.append(categoryAnchor);
  });
};
loadCategory();
