# Laptelligence Scan v1 - SOLO LEE MÉTRICAS BÁSICAS
# No accede a tus documentos ni fotos. Solo lee información de rendimiento.

Write-Host "Ejecutando escaneo básico de tu laptop..." -ForegroundColor Cyan

# Info de sistema
$os  = Get-CimInstance Win32_OperatingSystem
$cpu = Get-CimInstance Win32_Processor
$cs  = Get-CimInstance Win32_ComputerSystem

# RAM
$ramTotalGB = [math]::Round($cs.TotalPhysicalMemory / 1GB, 1)
$ramLibreGB = [math]::Round((Get-Counter '\Memory\Available MBytes').CounterSamples[0].CookedValue / 1024, 1)

# Discos (solo discos tipo "fijo")
$discos = Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3" |
    Select-Object DeviceID,
        @{Name="size_gb";  Expression = {[math]::Round($_.Size / 1GB, 1)}},
        @{Name="free_gb";  Expression = {[math]::Round($_.FreeSpace / 1GB, 1)}}

# Procesos más pesados por RAM
$procesosPesados = Get-Process |
    Sort-Object WorkingSet -Descending |
    Select-Object -First 10 Name,
        @{Name="ram_mb"; Expression = {[math]::Round($_.WorkingSet / 1MB, 0)}}

$resultado = [PSCustomObject]@{
    generated_at      = (Get-Date).ToString("s")
    os                = $os.Caption
    os_version        = $os.Version
    hostname          = $env:COMPUTERNAME
    cpu_name          = $cpu.Name
    cpu_cores         = $cpu.NumberOfCores
    ram_total_gb      = $ramTotalGB
    ram_free_gb       = $ramLibreGB
    disks             = $discos
    top_processes_ram = $procesosPesados
}

$json = $resultado | ConvertTo-Json -Depth 4

$path = Join-Path $env:USERPROFILE "Desktop\laptelligence_scan.json"
$json | Out-File -FilePath $path -Encoding UTF8

Write-Host ""
Write-Host "Listo. Se generó el archivo:" -ForegroundColor Green
Write-Host $path -ForegroundColor Yellow
Write-Host ""
Write-Host "Este archivo NO contiene tus documentos, solo métricas de rendimiento." -ForegroundColor DarkGray
Write-Host ""
Read-Host "Presioná Enter para cerrar esta ventana"

