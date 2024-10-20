import 'package:flutter_test/flutter_test.dart';
import 'package:splitto/src/payment_item.dart';

void main() {
  test('should take an amout', () {
    final item = PaymentItem(34);
    expect(item.amount, equals(34));
  });
}
