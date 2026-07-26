$prefix = 'http://127.0.0.1:3000/'
$root = 'C:\Users\Administrator\thewondermoms'
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Listening on $prefix"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    $path = $request.Url.AbsolutePath
    if ($path -eq '/' -or $path -eq '') { $path = '/index.html' }
    $fullPath = Join-Path $root ($path.TrimStart('/'))

    if (-not [System.IO.File]::Exists($fullPath)) {
        $response.StatusCode = 404
        $buffer = [System.Text.Encoding]::UTF8.GetBytes('Not Found')
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
        $response.Close()
        continue
    }

    $ext = [System.IO.Path]::GetExtension($fullPath)
    $mime = switch ($ext) {
        '.html' { 'text/html; charset=utf-8' }
        '.css' { 'text/css; charset=utf-8' }
        '.js' { 'application/javascript; charset=utf-8' }
        '.json' { 'application/json; charset=utf-8' }
        '.png' { 'image/png' }
        '.jpg' { 'image/jpeg' }
        '.jpeg' { 'image/jpeg' }
        '.svg' { 'image/svg+xml' }
        '.ico' { 'image/x-icon' }
        '.xml' { 'application/xml; charset=utf-8' }
        default { 'application/octet-stream' }
    }

    $response.ContentType = $mime
    $buffer = [System.IO.File]::ReadAllBytes($fullPath)
    $response.ContentLength64 = $buffer.Length
    $response.OutputStream.Write($buffer, 0, $buffer.Length)
    $response.Close()
}
