'use client';
import { useState } from 'react';
import { Icon } from '@/components/ds/Icon';
import { cn } from '@/lib/utils';

export function SmartKarobarDashboardMockup() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'catalog' | 'orders' | 'ai'>('inventory');

  return (
    <div className="relative mx-auto w-full max-w-5xl rounded-2xl border border-slate-200/80 bg-white shadow-2xl overflow-hidden text-slate-800">
      {/* Window Title Bar */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 bg-slate-900 px-3.5 py-2.5 text-white sm:px-6 sm:py-3">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <div className="h-3 w-3 rounded-full bg-rose-500/80" />
            <div className="h-3 w-3 rounded-full bg-amber-500/80" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block shrink-0" />
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-blue-600 text-[11px] font-bold text-white">
              SK
            </span>
            <span className="text-xs font-semibold tracking-wide text-slate-200 sm:text-sm truncate">
              SmartKarobar Operations Console
            </span>
            <span className="hidden rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-cyan-400 lg:inline-block shrink-0">
              Tenant #SK-9421
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-mono text-[11px]">Sync Engine Active</span>
          </div>
          <span className="hidden text-slate-600 md:inline">|</span>
          <span className="text-slate-400 font-mono text-[11px]">
            Connected Channels: 4
          </span>
        </div>
      </div>

      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 gap-2 border-b border-slate-100 bg-slate-50/70 p-2.5 sm:gap-3 sm:grid-cols-4 sm:p-5">
        <div className="rounded-xl border border-slate-200/60 bg-white p-3 sm:p-3.5 shadow-sm min-w-0 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 gap-1">
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider truncate">Today&apos;s Orders</span>
            <Icon name="shoppingCart" size={15} className="text-blue-600 shrink-0" />
          </div>
          <div className="mt-1.5 flex flex-col xl:flex-row xl:items-baseline xl:gap-1.5">
            <span className="text-lg font-bold text-slate-900 sm:text-2xl">42</span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 whitespace-nowrap">₹68,450 GMV</span>
          </div>
          <p className="mt-1 text-[10px] sm:text-[11px] text-slate-500 leading-tight">Across 4 channels</p>
        </div>

        <div className="rounded-xl border border-slate-200/60 bg-white p-3 sm:p-3.5 shadow-sm min-w-0 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 gap-1">
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider truncate">Inventory Health</span>
            <Icon name="refreshCw" size={15} className="text-cyan-600 shrink-0" />
          </div>
          <div className="mt-1.5 flex flex-col xl:flex-row xl:items-baseline xl:gap-1.5">
            <span className="text-lg font-bold text-slate-900 sm:text-2xl">99.8%</span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-blue-600 whitespace-nowrap">1,240 SKUs</span>
          </div>
          <p className="mt-1 text-[10px] sm:text-[11px] text-slate-500 leading-tight">0 sync conflicts</p>
        </div>

        <div className="rounded-xl border border-slate-200/60 bg-white p-3 sm:p-3.5 shadow-sm min-w-0 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 gap-1">
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider truncate">Meta Ads ROAS</span>
            <Icon name="barChart" size={15} className="text-indigo-600 shrink-0" />
          </div>
          <div className="mt-1.5 flex flex-col xl:flex-row xl:items-baseline xl:gap-1.5">
            <span className="text-lg font-bold text-slate-900 sm:text-2xl">3.8x</span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 whitespace-nowrap">₹4,200 spend</span>
          </div>
          <p className="mt-1 text-[10px] sm:text-[11px] text-slate-500 leading-tight">Authorized ad account</p>
        </div>

        <div className="rounded-xl border border-slate-200/60 bg-white p-3 sm:p-3.5 shadow-sm min-w-0 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 gap-1">
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider truncate">AI Insight</span>
            <Icon name="sparkles" size={15} className="text-amber-500 shrink-0" />
          </div>
          <div className="mt-1.5 flex flex-col xl:flex-row xl:items-baseline xl:gap-1.5">
            <span className="text-lg font-bold text-slate-900 sm:text-2xl">3 SKUs</span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-amber-600 whitespace-nowrap">Low Stock Alert</span>
          </div>
          <p className="mt-1 text-[10px] sm:text-[11px] text-slate-500 leading-tight">Reorder recommended</p>
        </div>
      </div>

      {/* Tab Navigation for Mockup Views - Scrollable & Accessible across all mobile viewports */}
      <div className="border-b border-slate-200 bg-white">
        <div className="flex overflow-x-auto px-2 sm:px-6 text-xs font-semibold text-slate-600 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]">
          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className={cn(
              'flex shrink-0 items-center gap-1.5 border-b-2 py-3 px-3 transition-colors whitespace-nowrap min-h-[44px]',
              activeTab === 'inventory'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent hover:text-slate-900'
            )}
          >
            <Icon name="refreshCw" size={14} className="shrink-0" />
            <span>Live Inventory Synchronization Flow</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('catalog')}
            className={cn(
              'flex shrink-0 items-center gap-1.5 border-b-2 py-3 px-3 transition-colors whitespace-nowrap min-h-[44px]',
              activeTab === 'catalog'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent hover:text-slate-900'
            )}
          >
            <Icon name="layers" size={14} className="shrink-0" />
            <span>Multi-Channel Catalog View</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={cn(
              'flex shrink-0 items-center gap-1.5 border-b-2 py-3 px-3 transition-colors whitespace-nowrap min-h-[44px]',
              activeTab === 'orders'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent hover:text-slate-900'
            )}
          >
            <Icon name="shoppingCart" size={14} className="shrink-0" />
            <span>Unified Orders Stream</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            className={cn(
              'flex shrink-0 items-center gap-1.5 border-b-2 py-3 px-3 transition-colors whitespace-nowrap min-h-[44px]',
              activeTab === 'ai'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent hover:text-slate-900'
            )}
          >
            <Icon name="sparkles" size={14} className="shrink-0" />
            <span>AI &amp; WhatsApp Assistant</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Live Inventory Flow Illustration */}
      {activeTab === 'inventory' && (
        <div className="p-3.5 sm:p-6 bg-slate-50/50">
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Event-Driven Propagation
                </span>
                <h4 className="text-sm font-bold text-slate-900 sm:text-base">
                  Automatic Cross-Channel Stock Ledger (Illustrative Flow)
                </h4>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
                Idempotent Sync Verified
              </span>
            </div>

            {/* Step Sequence in Mockup: 1 col on mobile, 2 cols on tablet, 4 cols on desktop */}
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 shrink-0">
                    Step 1: Event
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">14:02:18 IST</span>
                </div>
                <div className="mt-2.5 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 font-bold text-xs shrink-0">
                    AMZ
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">Order #402-98124</p>
                    <p className="text-[11px] text-slate-500 truncate">Amazon SP-API Feed</p>
                  </div>
                </div>
                <p className="mt-2 text-[11px] text-slate-600 leading-normal">
                  Customer buys <strong>1 unit</strong> of SKU-APL-04 (Cotton Kurti).
                </p>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50/60 p-3.5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-800 shrink-0">
                    Step 2: Ledger
                  </span>
                  <span className="text-[11px] text-blue-700 font-mono">14:02:19</span>
                </div>
                <div className="mt-2.5">
                  <p className="text-xs font-bold text-slate-900">SmartKarobar Central Stock</p>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="text-xs line-through text-slate-400">10 units</span>
                    <Icon name="arrowRight" size={12} className="text-blue-600 shrink-0" />
                    <span className="text-sm font-bold text-blue-700">9 units available</span>
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-600 leading-normal">
                    Atomic decrement safely executed in tenant ledger.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-cyan-200 bg-cyan-50/40 p-3.5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="rounded bg-cyan-100 px-1.5 py-0.5 text-[10px] font-bold text-cyan-800 shrink-0">
                    Step 3: Queued
                  </span>
                  <span className="text-[11px] text-cyan-700 font-mono">3 Jobs</span>
                </div>
                <div className="mt-2.5 space-y-1">
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-slate-700 font-medium">Flipkart Queue:</span>
                    <span className="font-semibold text-emerald-600 shrink-0">Dispatched (9)</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-slate-700 font-medium">Meesho Queue:</span>
                    <span className="font-semibold text-emerald-600 shrink-0">Dispatched (9)</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-slate-700 font-medium">Web Storefront:</span>
                    <span className="font-semibold text-emerald-600 shrink-0">Updated (9)</span>
                  </div>
                </div>
                <p className="mt-2 text-[10px] text-slate-500 leading-tight">
                  Rate limits respected; exponential backoff enabled.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-700 shrink-0">
                    Step 4: Audit
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">Hourly</span>
                </div>
                <div className="mt-2.5">
                  <p className="text-xs font-bold text-slate-800">Reconciliation Check</p>
                  <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                    Continuous parity verification between marketplace inventory snapshots and central records.
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                    <Icon name="check" size={12} className="shrink-0" />
                    <span>All balances reconciled</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-md bg-slate-100/80 p-2.5 text-center text-xs text-slate-600 leading-normal">
              <span className="font-semibold text-slate-800">Transparency Note:</span> This is an illustrative simulation of SmartKarobar&apos;s planned sync pipeline. Actual sync speed depends on event availability, API limits, and marketplace processing.
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Catalog View */}
      {activeTab === 'catalog' && (
        <div className="p-3.5 sm:p-6 bg-slate-50/50">
          <div className="sm:hidden mb-2 text-right text-[10px] text-blue-600 font-medium flex items-center justify-end gap-1">
            <Icon name="arrowRight" size={12} />
            <span>Scroll horizontally to view all channels</span>
          </div>
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-2xs">
            <table className="w-full min-w-[580px] text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3">SKU / Product</th>
                  <th className="py-2.5 px-3">Master Stock</th>
                  <th className="py-2.5 px-3">Amazon India</th>
                  <th className="py-2.5 px-3">Flipkart</th>
                  <th className="py-2.5 px-3">Meesho</th>
                  <th className="py-2.5 px-3">Web Store</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr className="hover:bg-slate-50/80">
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">SKU-APL-04</div>
                    <div className="text-slate-500 text-[11px]">Handloom Pure Cotton Kurti (Navy, M)</div>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-blue-600 whitespace-nowrap">9 units</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Active (₹899)
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      Synced (₹899)
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                      In Review
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                      Published
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80">
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">SKU-ELC-89</div>
                    <div className="text-slate-500 text-[11px]">Wireless Bluetooth Neckband Pro 40H</div>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-blue-600 whitespace-nowrap">45 units</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      BuyBox Active
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                      Synced (₹1,249)
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                      Draft Prepared
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                      Published
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80">
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">SKU-ACC-12</div>
                    <div className="text-slate-500 text-[11px]">Genuine Leather Formal Reversible Belt</div>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-amber-600 whitespace-nowrap">3 units (Low)</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                      Low Stock Alert
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                      Synced (3)
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                      Not Assigned
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                      3 Left in Stock
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] text-slate-500">
            SmartKarobar keeps local catalog data distinct from external publication states. Channel status indicators reflect authorized API responses.
          </p>
        </div>
      )}

      {/* Tab 3: Orders Stream */}
      {activeTab === 'orders' && (
        <div className="p-3.5 sm:p-6 bg-slate-50/50">
          <div className="sm:hidden mb-2 text-right text-[10px] text-blue-600 font-medium flex items-center justify-end gap-1">
            <Icon name="arrowRight" size={12} />
            <span>Scroll horizontally to view all order details</span>
          </div>
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-2xs">
            <table className="w-full min-w-[580px] text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Channel</th>
                  <th className="py-2.5 px-3">Items &amp; SKU</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Fulfillment Status</th>
                  <th className="py-2.5 px-3">Inventory Hold</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr className="hover:bg-slate-50/80">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">#402-98124</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                      Amazon IN
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-medium text-slate-800">Cotton Kurti (Navy, M)</div>
                    <div className="text-slate-400 font-mono text-[10px]">SKU-APL-04 × 1</div>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900 whitespace-nowrap">₹899</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                      Awaiting Packing
                    </span>
                  </td>
                  <td className="py-3 px-3 text-emerald-600 font-medium text-[11px] whitespace-nowrap">
                    Reserved (1 unit)
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">#FK-28401</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                      Flipkart
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-medium text-slate-800">Wireless Neckband Pro 40H</div>
                    <div className="text-slate-400 font-mono text-[10px]">SKU-ELC-89 × 2</div>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900 whitespace-nowrap">₹2,498</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                      Shipped / Tracking #8821
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 text-[11px] whitespace-nowrap">
                    Decremented (2 units)
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">#WEB-5402</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      Storefront
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-medium text-slate-800">Leather Reversible Belt</div>
                    <div className="text-slate-400 font-mono text-[10px]">SKU-ACC-12 × 1</div>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900 whitespace-nowrap">₹1,150</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="rounded bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">
                      Label Generated
                    </span>
                  </td>
                  <td className="py-3 px-3 text-emerald-600 font-medium text-[11px] whitespace-nowrap">
                    Reserved (1 unit)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: AI & WhatsApp Assistant */}
      {activeTab === 'ai' && (
        <div className="grid gap-4 p-3.5 sm:p-6 md:grid-cols-2 bg-slate-50/50">
          {/* AI Advisor Panel */}
          <div className="rounded-xl border border-blue-200 bg-white p-3.5 sm:p-4 shadow-sm min-w-0">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-white shrink-0">
                <Icon name="sparkles" size={14} />
              </span>
              <div className="min-w-0">
                <h5 className="text-xs font-bold text-slate-900 truncate">SmartKarobar AI Business Advisor</h5>
                <p className="text-[10px] text-slate-500 truncate">Tenant-Isolated Contextual Intelligence (Premium)</p>
              </div>
            </div>

            <div className="mt-3 space-y-2.5 text-xs">
              <div className="rounded-lg bg-slate-100 p-2.5 text-slate-700">
                <p className="font-semibold text-slate-900 text-[11px]">Seller Inquiry:</p>
                <p className="mt-0.5 italic">&quot;Which products have the highest return rate this month, and what is our stock outlook?&quot;</p>
              </div>

              <div className="rounded-lg bg-blue-50/70 border border-blue-100 p-2.5 text-slate-800">
                <p className="font-semibold text-blue-900 text-[11px] flex items-center gap-1">
                  <Icon name="check" size={12} className="text-blue-600" />
                  Advisor Analysis (Authorized Data Only):
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-700">
                  Based on your verified order records across Amazon and Flipkart, <strong>SKU-APL-04</strong> has an 8.2% return rate (primarily size adjustments), compared to the store average of 3.4%.
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-700">
                  <strong>Stock Outlook:</strong> Remaining balance is 9 units with 12 units projected demand over the next 5 days. Consider restocking 30 units to avoid a channel stockout.
                </p>
              </div>
            </div>
            <p className="mt-2 text-[10px] text-slate-400">
              * AI outputs are derived from authorized tenant records using retrieval-augmented generation. Foundation models are never retrained on customer data.
            </p>
          </div>

          {/* WhatsApp Controller Panel */}
          <div className="rounded-xl border border-emerald-200 bg-white p-3.5 sm:p-4 shadow-sm min-w-0">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-600 text-white shrink-0">
                <Icon name="messageSquare" size={14} />
              </span>
              <div className="min-w-0">
                <h5 className="text-xs font-bold text-slate-900 truncate">WhatsApp Business Controller</h5>
                <p className="text-[10px] text-slate-500 truncate">Operated by Onespheree • Authenticated Seller Session</p>
              </div>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-tr-none bg-emerald-600 px-3 py-2 text-white text-[11px]">
                  Show today&apos;s orders summary.
                </div>
              </div>

              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-tl-none bg-slate-100 border border-slate-200/60 px-3 py-2 text-slate-800 text-[11px] leading-relaxed">
                  <p className="font-bold text-slate-900 mb-1">📦 Today&apos;s SmartKarobar Dispatch Summary:</p>
                  <p>• Total Orders: <strong>42</strong> (₹68,450)</p>
                  <p>• Amazon IN: 28 orders</p>
                  <p>• Flipkart: 8 orders</p>
                  <p>• Website Store: 6 orders</p>
                  <p className="mt-1 text-emerald-700 font-semibold">6 orders awaiting packing slip print.</p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-[10px] text-slate-400">
              * WhatsApp queries route through Onespheree&apos;s Meta WhatsApp Business Platform integration with strict tenant identity validation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
