---
title: VPN_ISSUES
date: 2020-09-14 11:16:03
tags:
---


zss:~ root# kextstat | grep tun
  166    0 0xffffff7f83c4e000 0x8000     0x8000     sangfor.ssl.tun (1.0) FBA9A61D-E7BB-391C-92E2-C1D85BB065B2 <8 6 5 1>
zss:~ root# launchctl print-disabled system | grep sangfor
	"com.sangfor.EasyMonitor" => true
zss:~ root# launch
launchctl  launchd
zss:~ root# launch
launchctl  launchd
zss:~ root# launchctl enable system/com.sangfor.EasyMonitor
zss:~ root# launchctl print-disabled system | grep sangfor
	"com.sangfor.EasyMonitor" => false
zss:~ root# launch
launchctl  launchd
zss:~ root# launchctl load /Library/Launch
LaunchAgents/  LaunchDaemons/
zss:~ root# launchctl load /Library/Launch
LaunchAgents/  LaunchDaemons/
zss:~ root# launchctl load /Library/Launch
LaunchAgents/  LaunchDaemons/
zss:~ root# launchctl load /Library/LaunchDaemons/com.sangfor.EasyMonitor.plist
