using Bytewizer.Backblaze.Client;
using Bytewizer.Backblaze.Models;

namespace Tests.Mock
{
    public class StorageFilesMock : IStorageFiles
    {
        public Dictionary<string, byte[]> Files;
        
        public StorageFilesMock()
        {
            Files = new Dictionary<string, byte[]>();
        }

        public async Task<IApiResults<DeleteFileVersionResponse>> DeleteAsync(string fileId, string fileName)
        {
            Files.Remove(fileName);
            return new ApiResults<DeleteFileVersionResponse>(new HttpResponseMessage());
        }

        // Unused methods...

        public Task<IApiResults<CopyFileResponse>> CopyAsync(string sourceFileId, string fileName)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<CopyFileResponse>> CopyAsync(CopyFileRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<IList<DeleteFileVersionResponse>> DeleteAllAsync(ListFileVersionRequest request, int dop = 3)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<DownloadFileResponse>> DownloadAsync(DownloadFileByIdRequest request, Stream content, IProgress<ICopyProgress> progress)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<DownloadFileResponse>> DownloadAsync(DownloadFileByNameRequest request, Stream content, IProgress<ICopyProgress> progress)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<DownloadFileResponse>> DownloadAsync(string bucketName, string fileName, string localPath, IProgress<ICopyProgress> progress, CancellationToken cancel)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<DownloadFileResponse>> DownloadByIdAsync(string fileId, string localPath, IProgress<ICopyProgress> progress, CancellationToken cancel)
        {
            throw new NotImplementedException();
        }

        public Task<FileItem> FirstAsync(ListFileNamesRequest request, Func<FileItem, bool> predicate, TimeSpan cacheTTL = default)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<GetDownloadAuthorizationResponse>> GetDownloadTokenAsync(string bucketId, string fileNamePrefix, long validDurationInSeconds = 3600)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<GetDownloadAuthorizationResponse>> GetDownloadTokenAsync(GetDownloadAuthorizationRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<FileItem>> GetEnumerableAsync(ListFileNamesRequest request, TimeSpan cacheTTL = default)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<FileItem>> GetEnumerableAsync(ListFileVersionRequest request, TimeSpan cacheTTL = default)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<FileItem>> GetEnumerableAsync(ListUnfinishedLargeFilesRequest request, TimeSpan cacheTTL = default)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<GetFileInfoResponse>> GetInfoAsync(string fileId)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<GetUploadUrlResponse>> GetUploadUrlAsync(string bucketId)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<GetUploadUrlResponse>> GetUploadUrlAsync(string bucketId, TimeSpan cacheTTL = default)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<HideFileResponse>> HideAsync(string bucketId, string fileName)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<ListFileNamesResponse>> ListNamesAsync(string bucketId)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<ListFileNamesResponse>> ListNamesAsync(ListFileNamesRequest request, TimeSpan cacheTTL = default)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<ListUnfinishedLargeFilesResponse>> ListUnfinishedAsync(string bucketId)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<ListUnfinishedLargeFilesResponse>> ListUnfinishedAsync(ListUnfinishedLargeFilesRequest request, TimeSpan cacheTTL = default)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<ListFileVersionResponse>> ListVersionsAsync(string bucketId)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<ListFileVersionResponse>> ListVersionsAsync(ListFileVersionRequest request, TimeSpan cacheTTL = default)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<UploadFileResponse>> UploadAsync(string bucketId, string fileName, string localPath, IProgress<ICopyProgress> progress, CancellationToken cancel)
        {
            throw new NotImplementedException();
        }
    }
}