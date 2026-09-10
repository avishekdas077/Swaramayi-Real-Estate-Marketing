const getPagination = (reqQuery, defaultLimit = 12) => {
  const page = Math.max(1, parseInt(reqQuery.page, 10) || 1);
  const limit = Math.max(1, Math.min(100, parseInt(reqQuery.limit, 10) || defaultLimit));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

const formatPaginatedResponse = (data, total, page, limit) => {
  const totalPages = Math.ceil(total / limit) || 1;
  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

module.exports = { getPagination, formatPaginatedResponse };
