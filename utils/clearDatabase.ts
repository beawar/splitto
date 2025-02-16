import * as FileSystem from "expo-file-system";

const clearDatabase = async () => {
  try {
    // Get the SQLite directory path
    const sqliteDirectory = `${FileSystem.documentDirectory}SQLite/`;

    // Get all files in the SQLite directory
    const files = await FileSystem.readDirectoryAsync(sqliteDirectory);

    // Find and delete any .db files
    for (const file of files) {
      if (file.endsWith(".db")) {
        const filePath = `${sqliteDirectory}${file}`;
        await FileSystem.deleteAsync(filePath);
        console.log(`Deleted database file: ${file}`);
      }
    }
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ERR_FILESYSTEM_CANNOT_READ_DIRECTORY"
    ) {
      console.log("SQLite directory not found - no databases to delete");
    } else {
      console.error("Error clearing database:", error);
    }
  }
};
