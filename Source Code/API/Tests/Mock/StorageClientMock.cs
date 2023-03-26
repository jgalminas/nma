using Bytewizer.Backblaze.Client;
using Bytewizer.Backblaze.Models;

namespace Tests.Mock
{
    public class StorageClientMock : IStorageClient
    {
        public IStorageFiles Files { get; set; }

        StorageFilesMock _filesMock;

        public StorageClientMock()
        {
            // This is a huge hack!
            // We need to store a `StorageFilesMock` object so we can access its
            // in-memory file dictionary `_files`.
            // However, we also need `Files` to point to an `IStorageFiles` object.
            // So, we can have two fields, one for public access, one for internal use.
            Files = _filesMock = new StorageFilesMock();
        }

        public async Task<IApiResults<UploadFileResponse>> UploadAsync(string bucketId, string fileName, Stream content)
        {
            using (var memoryStream = new MemoryStream())
            {
                await content.CopyToAsync(memoryStream);
                var arr = memoryStream.ToArray();
                _filesMock.Files.Add(fileName, arr);
            }

            return new ApiResults<UploadFileResponse>(new HttpResponseMessage());
        }

        public async Task<IApiResults<DownloadFileResponse>> DownloadByIdAsync(string fileId, Stream content)
        {
            var data = _filesMock.Files[fileId];
            await content.WriteAsync(data, 0, data.Count());
            return new ApiResults<DownloadFileResponse>(new HttpResponseMessage());
        }

        // Unused methods...

        public IStorageDirectories Directories => throw new NotImplementedException();

        public IStorageBuckets Buckets => throw new NotImplementedException();

        public IStorageKeys Keys => throw new NotImplementedException();

        public IStorageParts Parts => throw new NotImplementedException();

        public string AccountId => throw new NotImplementedException();

        public CancellationToken CancellationToken { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public AuthorizeAccountResponse Connect()
        {
            throw new NotImplementedException();
        }

        public AuthorizeAccountResponse Connect(string keyId, string applicationKey)
        {
            throw new NotImplementedException();
        }

        public Task<AuthorizeAccountResponse> ConnectAsync()
        {
            throw new NotImplementedException();
        }

        public Task<AuthorizeAccountResponse> ConnectAsync(string keyId, string applicationKey)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<DownloadFileResponse>> DownloadAsync(string bucketName, string fileName, Stream content)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<DownloadFileResponse>> DownloadAsync(DownloadFileByNameRequest request, Stream content, IProgress<ICopyProgress> progress, CancellationToken cancel)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<DownloadFileResponse>> DownloadByIdAsync(DownloadFileByIdRequest request, Stream content, IProgress<ICopyProgress> progress, CancellationToken cancel)
        {
            throw new NotImplementedException();
        }

        public Task<IApiResults<UploadFileResponse>> UploadAsync(UploadFileByBucketIdRequest request, Stream content, IProgress<ICopyProgress> progress, CancellationToken cancel)
        {
            throw new NotImplementedException();
        }
    }
}