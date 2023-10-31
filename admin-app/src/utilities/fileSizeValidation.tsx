export default function FileSizeValidation(selectedFile: any) {
    const MIN_FILE_SIZE = 1
    const MAX_FILE_SIZE = 15360
    const fileSizeKiloBytes = selectedFile.size / 1024
    // Check if any file is selected.
    return !(fileSizeKiloBytes > MAX_FILE_SIZE || fileSizeKiloBytes < MIN_FILE_SIZE);
}