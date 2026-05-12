$base = 'https://nhakhoagiakiem.com'
$slugs = @(
  'don-tet-binh-ngo-rang-ro-nu-cuoi-don-xuan',
  'thong-bao-lich-nghi-tet-duong-lich',
  'nieng-rang-co-dau-khong-chia-se-thuc-te-truoc-khi-quyet-dinh',
  'tay-trang-rang-gia-kiem-dong-nai-tu-tin-nu-cuoi-sang-khoe-moi-ngay',
  'trong-rang-implant-giai-phap-khoi-phuc-rang-mat-ben-vung',
  'nho-rang-khon-giai-phap-giam-dau-bao-ve-rang-ben-canh',
  'rang-thao-lap-giai-phap-tiet-kiem-an-tam-cho-co-chu',
  'phuc-hinh-rang-la-gi',
  'nieng-rang-dau-tu-mot-lan-tu-tin-ca-doi',
  'tram-rang-tham-my-giai-phap-khoi-phuc-rang-nhanh-an-toan-va-tiet-kiem',
  'nha-khoa-uy-duc-nha-khoa-gia-kiem-uy-tin-chat-luong-tai-dong-nai',
  'boc-rang-su-tham-my-uy-tin-tai-dong-nai'
)
function CleanText($s) {
  if ($null -eq $s) { return '' }
  $s = [System.Net.WebUtility]::HtmlDecode($s)
  $s = $s -replace '<script[\s\S]*?</script>', ' '
  $s = $s -replace '<style[\s\S]*?</style>', ' '
  $s = $s -replace '<[^>]+>', ' '
  $s = $s -replace '\s+', ' '
  return $s.Trim()
}
function Sql($s) { return "'" + (($s -replace "'", "''").Trim()) + "'" }
$posts = @()
foreach ($slug in $slugs) {
  $url = "$base/$slug"
  try {
    $html = (Invoke-WebRequest -Uri $url -UseBasicParsing).Content
    $title = [regex]::Match($html, '<meta\s+property=["'']og:title["'']\s+content=["''](?<v>[^"'']+)', 'IgnoreCase').Groups['v'].Value
    if (-not $title) { $title = [regex]::Match($html, '<title>(?<v>[\s\S]*?)</title>', 'IgnoreCase').Groups['v'].Value }
    $desc = [regex]::Match($html, '<meta\s+property=["'']og:description["'']\s+content=["''](?<v>[^"'']*)', 'IgnoreCase').Groups['v'].Value
    $img = [regex]::Match($html, '<meta\s+property=["'']og:image["'']\s+content=["''](?<v>[^"'']+)', 'IgnoreCase').Groups['v'].Value
    if (-not $img) { $img = [regex]::Match($html, '(?:data-src|src)=["''](?<v>[^"'']*upload/news/[^"'']+)', 'IgnoreCase').Groups['v'].Value }
    if ($img -and $img -notmatch '^https?://') { $img = "$base/$img" }
    $article = [regex]::Match($html, '<(?:article|div)[^>]*(?:content|detail|news)[^>]*>(?<v>[\s\S]{500,}?)</(?:article|div)>', 'IgnoreCase').Groups['v'].Value
    $content = CleanText($(if ($article) { $article } else { $html }))
    if ($content.Length -gt 1800) { $content = $content.Substring(0,1800) + '...' }
    $title = CleanText($title) -replace ' - Nha Khoa Uy Đức.*$', ''
    $desc = CleanText($desc)
    if (-not $desc -or $desc.Length -lt 30) { $desc = if ($content.Length -gt 180) { $content.Substring(0,180) + '...' } else { $content } }
    $posts += [pscustomobject]@{Title=$title;Excerpt=$desc;Content=$content;ImageUrl=$img;Category='Tin tức'}
  } catch { Write-Warning "Failed $url $_" }
}
$sql = @()
$sql += '-- Import nội dung từ https://nhakhoagiakiem.com/'
$sql += 'truncate table banners restart identity cascade;'
$sql += 'truncate table services restart identity cascade;'
$sql += 'truncate table posts restart identity cascade;'
$sql += "insert into banners (title, subtitle, image_url, cta_text, sort_order) values"
$sql += "('NHA KHOA UY ĐỨC SMILE', 'Nha khoa uy tín khu vực Gia Kiệm - Đồng Nai', 'https://nhakhoagiakiem.com/thumbs/1366x550x1/upload/photo/nhakhoagiakiem-slider-1-20350.png', 'ĐẶT HẸN NGAY', 1),"
$sql += "('CHĂM SÓC NỤ CƯỜI TOÀN DIỆN', 'Dịch vụ nha khoa hiện đại, tận tâm và an toàn', 'https://nhakhoagiakiem.com/thumbs/1366x550x1/upload/photo/nhakhoagiakiem-slider-2-71250.png', 'Tư vấn miễn phí', 2);"
$sql += "insert into services (name, description, image_url) values"
$sql += "('Răng sứ thẩm mỹ', 'Phục hình răng sứ thẩm mỹ, cải thiện màu sắc và dáng răng tự nhiên.', 'https://nhakhoagiakiem.com/thumbs/340x270x1/upload/news/rang-su-2-9204.jpg'),"
$sql += "('Trồng răng Implant', 'Giải pháp phục hồi răng mất bền vững, hỗ trợ ăn nhai chắc chắn.', 'https://nhakhoagiakiem.com/thumbs/340x270x1/upload/news/rang-su-2796.jpg'),"
$sql += "('Tẩy trắng răng', 'Giúp răng sáng khỏe, cải thiện thẩm mỹ nụ cười nhanh chóng.', 'https://nhakhoagiakiem.com/thumbs/340x270x1/upload/news/voi-rang-2761.jpg'),"
$sql += "('Nhổ răng khôn', 'Thăm khám kỹ lưỡng, xử lý răng khôn an toàn và giảm đau.', 'https://nhakhoagiakiem.com/thumbs/340x270x1/upload/news/img8956-1677-3662.jpg'),"
$sql += "('Niềng răng', 'Cải thiện khớp cắn và thẩm mỹ nụ cười với lộ trình phù hợp.', 'https://nhakhoagiakiem.com/thumbs/340x270x1/upload/news/img8955-4068-3455.jpg'),"
$sql += "('Trám răng thẩm mỹ', 'Khôi phục răng sâu, mẻ hoặc thưa bằng vật liệu thẩm mỹ.', 'https://nhakhoagiakiem.com/thumbs/340x270x1/upload/news/z694275626332853d8bacf6d0730aa071448872b0c5a26-3532.jpg');"
$sql += 'insert into posts (title, excerpt, content, image_url, category) values'
$values = @()
foreach ($p in $posts) { $values += "($(Sql $p.Title), $(Sql $p.Excerpt), $(Sql $p.Content), $(Sql $p.ImageUrl), $(Sql $p.Category))" }
$sql += ($values -join ",`n") + ';'
$sql -join "`r`n" | Set-Content -Path 'supabase-import-nhakhoagiakiem.sql' -Encoding UTF8
Write-Output "Created supabase-import-nhakhoagiakiem.sql with $($posts.Count) posts"
