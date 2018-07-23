using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;

namespace Banico.Identity.Controllers
{
    public static class HttpRequestExtensions
    {
        public static string GetRawUrl(this HttpRequest request)
        {
            if (string.IsNullOrEmpty(request.Scheme)) {
                throw new InvalidOperationException("Missing Scheme");
            }
            if (!request.Host.HasValue) {
                throw new InvalidOperationException("Missing Host");
            }
            string path = (request.PathBase.HasValue || request.Path.HasValue) ? (request.PathBase + request.Path).ToString() : "/";
            return request.Scheme + "://" + request.Host + path + request.Query;
        }
    }
}