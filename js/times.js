

const loadCategory = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  displayCategory(data.data.news_category);
};

const displayCategory = (categories) => {
  const categoryName = document.getElementById("category");
  categories.forEach((category) => {
    const categoryDiv = document.createElement("li");
    categoryDiv.innerHTML = `
    <li><a onclick = "newsByCategory('${category.category_id}')" >${category.category_name}</a></li>
    `;
    categoryName.appendChild(categoryDiv);
  });
};

const newsByCategory = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategoryNews(data.data));
};

const displayCategoryNews = (news) => {
  const categoryNews = document.getElementById("news-body");
  categoryNews.textContent = "";
  news.forEach((allNews) => {


    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
        <div class="card-body">
         <div>
         <img src="${allNews.image_url}" alt="" width="600" height="400">
         </div>
          <h5 class="card-title">${allNews.title}</h5>
          <p>${allNews.details.length > 100
        ? allNews.details.slice(0, 100) + "..."
        : allNews.details
      }</p>
          <div class="flex">
            <div><img src="${allNews.author.img
      }" alt="" width="50" height="30" style="border-radius: 50%;"></div> &nbsp; &nbsp;
            <div><span style="color:purple;font-weight:bold;">${allNews.author.name ? allNews.author.name : "Author not found"
      }</span><br>
            <span>${allNews.author.published_date
        ? allNews.author.published_date
        : "Date not found"
      }</span>
            <span style="font-weight:bold;">&nbsp;&nbsp; Views: ${allNews.total_view ? allNews.total_view : "No Views"
      }</span>
            <label for="my-modal-6" onclick = "displayModal('${allNews._id
      }')" class="btn btn-link modal-button bg-blue-700 rounded-full text-white ml-20 ">Details</label>
          </div>
        </div>
    `;
    categoryNews.appendChild(newsDiv);
  });
};

const displayModal = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showNewsDetails(data.data));
};

const showNewsDetails = (news) => {
  const showModal = document.getElementById("modal-body");
  // console.log(news[0]);
  showModal.innerHTML = `
  <img src="${news[0].image_url}" alt="" width="600" height="400"> <br>
  <div class="flex">
    <div>
    <img src="${news[0].author.img
    }" alt="" width="50" height="30" style="border-radius: 50%;">
    </div> &nbsp; &nbsp;
    <div><span style="color:purple;font-weight:bold;">${news[0].author.name ? news[0].author.name : "Author not found"
    }</span><br>
    <span>${news[0].author.published_date
      ? news[0].author.published_date
      : "Date not found"
    }</span>
    </div>
  </div> 
  <br>
  <h6 class="card-title">${news[0].title}</h6> <br>
  <p><span style="font-weight:bold;">Read Details:</span> ${news[0].details}</p>
  `;
};

loadCategory();