
const GetClass = class {
    constructor(query, queryStr) {
        this.queryStr = queryStr;
        this.query = query;
    }
    filter() {
        let queryObj = Object.fromEntries(new URLSearchParams(this.queryStr));

        const excluded = ['page', 'limit', 'sort', 'fields'];

        excluded.forEach(item => delete queryObj[item]);

        let queryString = JSON.stringify(queryObj);
        queryString = queryString.replace(/\b(gt|gte|lte|lt)\b/g, match=>
            `$${match}`
        );

        this.query.find(JSON.parse(queryString));

        return this
    }
    sort() {
        if(this.queryStr.get('sort')) {
            let sortString = this.queryStr.sort.split(",").join(" ");
            this.query = this.query.sort(sortString);
        } else{
            this.query = this.query.sort("createdAt");
        }
        return this;
    }
    paginate() {
        // console.log(this.queryStr.limit)
        const page = this.queryStr.get('page') ?  this.queryStr.get('page') * 1 : 1;
        const limit = this.queryStr.get('limit') ? this.queryStr.get('limit') * 1 : 10;

        let skip = (page - 1) * limit;

        this.query.skip(skip).limit(limit);

        return this
    }

    fields() {
        if(this.queryStr.get('fields')) {
            let fields =this.queryStr.get('fields').split(",").join(" ");
            this.query.select(fields);
        } else{
            this.query.select("-__v");
        }
        return this
    }
}

module.exports = GetClass;