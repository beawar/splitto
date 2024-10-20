import 'package:splitto/src/payment_item.dart';

class Member {
  List<PaymentItem> payments = [];
  
  double get debts {
    return payments
        .map((item) => item.amount)
        .fold(0, (sum, item) => sum + item);
  }

  double get credits {
    return 0;
  }

  void addPayment(PaymentItem item) {
    payments.add(item);
  }

  void removePayment(PaymentItem item) {
    payments.remove(item);
  }
}
