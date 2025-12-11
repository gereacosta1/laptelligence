# laptelligence_scan.ps1
# Versión 1.0.0 - Escaneo básico de rendimiento para Laptelligence

Write-Host "Ejecutando escaneo básico de tu laptop..." -ForegroundColor Cyan

try {
    # --- RAM ---
    $os  = Get-CimInstance Win32_OperatingSystem
    $cs  = Get-CimInstance Win32_ComputerSystem

    $totalRamGb = [math]::Round($cs.TotalPhysicalMemory / 1GB, 1)
    $freeRamGb  = [math]::Round(($os.FreePhysicalMemory * 1KB) / 1GB, 1)
    $usedRamGb  = [math]::Round($totalRamGb - $freeRamGb, 1)

    # --- Disco (todas las unidades tipo 3 = disco fijo) ---
    $disks = Get-CimInstance Win32_LogicalDisk -Filter "DriveType = 3"

    $totalDiskBytes = ($disks.Size | Measure-Object -Sum).Sum
    $freeDiskBytes  = ($disks.FreeSpace | Measure-Object -Sum).Sum

    $totalDiskGb = [math]::Round($totalDiskBytes / 1GB, 1)
    $freeDiskGb  = [math]::Round($freeDiskBytes / 1GB, 1)

    # --- Info básica del sistema ---
    $computerName = $env:COMPUTERNAME
    $osVersion    = $os.Caption
    $osBuild      = $os.Version

    $result = [ordered]@{
        Version     = "1.0.0"
        GeneratedAt = (Get-Date).ToString("o")
        SystemInfo  = "$computerName - $osVersion ($osBuild)"

        Memory = @{
            TotalGB = $totalRamGb
            UsedGB  = $usedRamGb
        }

        Disk = @{
            TotalGB = $totalDiskGb
            FreeGB  = $freeDiskGb
        }
    }

    $outputPath = Join-Path $env:USERPROFILE "Desktop\laptelligence_scan.json"

    $result | ConvertTo-Json -Depth 4 | Out-File -FilePath $outputPath -Encoding UTF8

    Write-Host ""
    Write-Host "Listo. Se generó el archivo:" -ForegroundColor Green
    Write-Host "  $outputPath" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Este archivo NO contiene tus documentos, solo métricas de rendimiento." -ForegroundColor DarkGray
}
catch {
    Write-Host "Ocurrió un error durante el escaneo:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}
