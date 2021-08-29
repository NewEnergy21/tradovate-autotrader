#!/usr/bin/env node

const path		= require('path');
const program	= require('commander');
const main 		= require('./index.js');

// -e is required, to specify the trading environment
// -r for if replay is called
// -o to enable orders and not just running thes trategy
program
	.option('-e, --env <environment>', 'environment for trading (DEMO: d, LIVE: l, REPLAY: r)', 'd')
	.option('-r, --startTimestamp <timestamp>', 'ISO 8601 timestamp (defaults to empty)', false)
	.option('-o, --allowOrders', 'specify if orders are allowed', false)
	.parse(process.argv);

main(program.opts())