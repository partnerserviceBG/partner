const { DataTypes, QueryTypes } = require("sequelize");
const sequelize = require("../db");

const isMissingTableError = (error) => {
  if (!error) {
    return false;
  }
  if (error.name === "SequelizeDatabaseError" || error.name === "SequelizeUnknownTableError") {
    return true;
  }
  return typeof error.message === "string"
    && error.message.includes("No description found for");
};

const ensureHousesTable = async (queryInterface) => {
  try {
    await queryInterface.describeTable("houses");
  } catch (error) {
    if (!isMissingTableError(error)) {
      throw error;
    }

    await queryInterface.createTable("houses", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      riasId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      payload: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      geometry: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  }
};

const ensureHousesGeometryColumn = async (queryInterface) => {
  const table = await queryInterface.describeTable("houses");
  if (!table.geometry) {
    await queryInterface.addColumn("houses", "geometry", {
      type: DataTypes.JSONB,
      allowNull: true,
    });
  }
};

const ensureHousesFullAddressColumn = async (queryInterface) => {
  const table = await queryInterface.describeTable("houses");
  if (!table.fullAddress) {
    await queryInterface.addColumn("houses", "fullAddress", {
      type: DataTypes.STRING,
      allowNull: true,
    });
  }
};

const ensureHousesFullAddressIndex = async (queryInterface) => {
  const indexes = await queryInterface.showIndex("houses");
  const hasIndex = indexes.some((index) => index.name === "houses_full_address_idx");
  if (!hasIndex) {
    await queryInterface.addIndex("houses", ["fullAddress"], {
      name: "houses_full_address_idx",
    });
  }
};

const normalizeHousesIds = (housesId) => {
  if (Array.isArray(housesId)) {
    return housesId.map((id) => String(id).trim()).filter(Boolean);
  }
  if (typeof housesId === "string") {
    return housesId
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
  }
  return [];
};

const ensurePostHousesTable = async (queryInterface) => {
  try {
    await queryInterface.describeTable("post_houses");
  } catch (error) {
    if (!isMissingTableError(error)) {
      throw error;
    }

    await queryInterface.createTable("post_houses", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "posts",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      houseId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  }
};

const ensurePostHousesIndexes = async (queryInterface) => {
  const indexes = await queryInterface.showIndex("post_houses");
  const hasPostIdIndex = indexes.some((index) => index.name === "post_houses_post_id_idx");
  const hasHouseIdIndex = indexes.some((index) => index.name === "post_houses_house_id_idx");
  const hasUniquePairIndex = indexes.some((index) =>
    index.name === "post_houses_post_house_unique_idx"
  );

  if (!hasPostIdIndex) {
    await queryInterface.addIndex("post_houses", ["postId"], {
      name: "post_houses_post_id_idx",
    });
  }
  if (!hasHouseIdIndex) {
    await queryInterface.addIndex("post_houses", ["houseId"], {
      name: "post_houses_house_id_idx",
    });
  }
  if (!hasUniquePairIndex) {
    await queryInterface.addIndex("post_houses", ["postId", "houseId"], {
      unique: true,
      name: "post_houses_post_house_unique_idx",
    });
  }
};

const ensurePostHousesData = async (queryInterface) => {
  const postsTable = await queryInterface.describeTable("posts");
  if (!postsTable.housesId) {
    return;
  }
  const rows = await queryInterface.sequelize.query(
    "SELECT id, \"housesId\" FROM posts",
    { type: QueryTypes.SELECT },
  );
  if (!Array.isArray(rows) || rows.length === 0) {
    return;
  }

  for (const row of rows) {
    const houseIds = normalizeHousesIds(row.housesId);
    if (houseIds.length === 0) {
      continue;
    }
    for (const houseId of houseIds) {
      await queryInterface.sequelize.query(
        `INSERT INTO post_houses ("postId", "houseId", "createdAt", "updatedAt")
         VALUES (:postId, :houseId, NOW(), NOW())
         ON CONFLICT ("postId", "houseId") DO NOTHING`,
        {
          replacements: {
            postId: row.id,
            houseId,
          },
        },
      );
    }
  }
};

const ensureDropPostsHousesIdColumn = async (queryInterface) => {
  const postsTable = await queryInterface.describeTable("posts");
  if (postsTable.housesId) {
    await queryInterface.removeColumn("posts", "housesId");
  }
};

const ensureUsersRoleColumn = async (queryInterface) => {
  const table = await queryInterface.describeTable("users");
  if (!table.role) {
    await queryInterface.addColumn("users", "role", {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "admin",
    });
  }
  await queryInterface.sequelize.query(
    `UPDATE users SET role = 'admin' WHERE role IS NULL OR role = ''`,
  );
};

const runMigrations = async () => {
  const queryInterface = sequelize.getQueryInterface();
  await ensureHousesTable(queryInterface);
  await ensureHousesGeometryColumn(queryInterface);
  await ensureHousesFullAddressColumn(queryInterface);
  await ensureHousesFullAddressIndex(queryInterface);
  await ensurePostHousesTable(queryInterface);
  await ensurePostHousesIndexes(queryInterface);
  await ensurePostHousesData(queryInterface);
  await ensureDropPostsHousesIdColumn(queryInterface);
  await ensureUsersRoleColumn(queryInterface);
};

module.exports = {
  runMigrations,
};
