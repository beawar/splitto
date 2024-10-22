import 'package:flutter/material.dart';
import 'package:splitto/src/payment_item/payment_item.dart';

/// Displays detailed information about a PaymentItem.
class PaymentItemDetailsView extends StatelessWidget {
  const PaymentItemDetailsView({required this.item, super.key});

  static const routeName = '/payment_item';
  final PaymentItem item;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Item Details'),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Text("Amount: ${item.amount}"),
            Text("${item.payer.name} paid")
          ],
        ),
      ),
    );
  }
}