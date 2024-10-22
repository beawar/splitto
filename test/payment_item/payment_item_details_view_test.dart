import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:splitto/src/member.dart';
import 'package:splitto/src/payment_item/payment_item.dart';
import 'package:splitto/src/payment_item/payment_item_details_view.dart';

void main() {
  group('PaymentViewWidget', () {
    testWidgets('should show the amount', (WidgetTester tester) async {
      final payer = Member('payer name');
      final borrowers = [Member('borrower one'), payer, Member('borrower two')];
      final paymentItem = PaymentItem(89.66, payer, borrowers);

      await tester.pumpWidget(
          MaterialApp(home: PaymentItemDetailsView(item: paymentItem)));

      expect(find.text("Amount: ${paymentItem.amount.toString()}"), findsOne);
    });

    testWidgets('should show the payer', (WidgetTester tester) async {
      final payer = Member('payer name');
      final borrowers = [Member('borrower one'), payer, Member('borrower two')];
      final paymentItem = PaymentItem(89.66, payer, borrowers);

      await tester.pumpWidget(
          MaterialApp(home: PaymentItemDetailsView(item: paymentItem)));

      expect(find.text("${paymentItem.payer.name} paid"), findsOne);
    });
  });
}
