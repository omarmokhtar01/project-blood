// eslint-disable-next-line no-unused-vars
class ApiFeatures {
  constructor(queryMongoose, queryString) {
    this.queryMongoose = queryMongoose;
    this.queryString = queryString;
  }
  search(modelName) {
    if (this.queryString.search) {
      let querySearch = {};
      if (modelName == "Hospital") {
        querySearch.$or = [
          { name: { $regex: this.queryString.search, $options: "i" } },
          { location: { $regex: this.queryString.search, $options: "i" } },
        ];
      }

      this.queryMongoose = this.queryMongoose.find(querySearch);
    }
    return this;
  }
  pagination(countDocument) {
    const page = this.queryString.page * 1 || 1; // page num 1
    const limit = this.queryString.limit * 1 || 5; // num of Product in page (5 is defult value)
    const skip = (page - 1) * limit; // skip Product in next page
    const endIndexPage = page * limit; //pagenum 2 * 10 limit =20
    // Pagination Result
    let paginate = {};
    paginate.currentPage = page;
    paginate.limit = limit;
    paginate.numOfPages = Math.ceil(countDocument / limit); // 50 / 5 = 10

    // next page
    if (endIndexPage < countDocument) {
      paginate.next = page + 1;
    }

    // Prev Page
    if (skip > 0) {
      paginate.prev = page - 1;
    }
    this.queryMongoose = this.queryMongoose.skip(skip).limit(limit);
    // add property for object to access data
    this.paginationResult = paginate;
    return this;
  }
}

module.exports = ApiFeatures;
