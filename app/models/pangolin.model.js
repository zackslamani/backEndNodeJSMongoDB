module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            age: Number,
            family: String,
            breed: String,
            food: String
        },
        {timestamps: true}
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Pangolin = mongoose.model("pangolin", schema);
    return Pangolin;
};