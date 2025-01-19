"use strict";

/** @param {FsContext} ctx */
const freq = async (ctx) => {
    const tx = $db().Tx(ctx);
    
    var pts = [];
    try {
        pts = tx.Query(
            ctx,
            "SELECT tags, count(*) as freq FROM posts_tags GROUP BY tags"
        );

        for (var i = 0; i < pts.length; i++) {
            const ele = JSON.parse(pts[i]);

            var result = tx.Builder('tag')
                .Where({ id: ele["tags"] })
                .Update(ctx, { frequency: ele["freq"] });

            console.log("affected rows:", result);
        }
    } catch (err) {
        console.log("error:", err);
    }

    tx.Rollback();

    return {
        pts,
        trace_id: ctx.TraceID(),
    };
};


module.exports = {
    freq,
};
